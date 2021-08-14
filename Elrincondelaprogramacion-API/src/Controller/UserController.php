<?php

namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Filesystem\Filesystem;

class UserController extends AbstractController
{
    private $userRepo;
    private $em;

    public function __construct(EntityManagerInterface $entityManager) {
        $this->userRepo=$entityManager->getRepository(User::class);
        $this->em=$entityManager;
    }

    /**
     * Función que registra un usuario
     * @param $request
     * @return JsonResponse
     */
    public function register(Request $request)
    {
        $request=$request->get('json', null);
        if ($request) {
            //Con true decodificamos la petición a un array
            $decodedRequest=json_decode($request, true);
            /*array_map itera sobre los elementos de $decodedRequest ejecutando 
            la función trim*/
            $decodedRequest=array_map('trim', $decodedRequest);
            if ($this->validations('register', $decodedRequest)) {
                //Si no existe
                if (!$this->userRepo->findOneBy(['email'=>$decodedRequest['email']])) {
                    $encryptedPassword=password_hash($decodedRequest['password'], PASSWORD_BCRYPT);
                    $user=new User($decodedRequest['nick'], $decodedRequest['email'], $encryptedPassword, 
                        null, false, [$decodedRequest['role']]);
                    $user->execute($this->em, $user, 'insert');                 
                    return $this->json([$user, 'password'=>$decodedRequest['password']], 201);
                }
                return $this->json(['message'=>'That user already exists'], 500);
            }
            return $this->json(['message'=>'Wrong field'], 400);      
        }
        return $this->json(['message'=>'Wrong json'], 400);
    }

    /**
     * Función que modifica un usuario
     * @param $id
     * @param $request
     * @return JsonResponse
     */
    public function update($id, Request $request)
    {
        try {
            if ($this->idValidation($id)) {
                $userLoggedIn=$this->get('security.token_storage')->getToken()->getUser();;              
                //Si el usuario que modificamos es el que está logueado
                if ($userLoggedIn->getId()==$id) {
                    $request=$request->get('json', null);
                    if ($request) {
                        $user=$this->userRepo->find(['id'=>$id]);
                        //Si existe el usuario
                        if ($user) {
                            //Con true decodificamos la petición a un array
                            $decodedRequest=json_decode($request, true);
                            /*Eliminamos este propiedad ya que array_map itera sobre elementos
                            simples de un array, no sobre otros elementos arrays*/
                            unset($decodedRequest['roles']);
                            /*array_map itera sobre los elementos de $decodedRequest ejecutando 
                            la función trim*/
                            $decodedRequest=array_map('trim', $decodedRequest);                      
                            /*?: indica que $decodedRequest['nick'] si tiene valor será ese 
                            sino $user->getNick()*/
                            $decodedRequest['nick']=$decodedRequest['nick']?:$user->getNick();
                            $decodedRequest['email']=$decodedRequest['email']?:$user->getEmail();
                            $decodedRequest['profileImage']=$decodedRequest['profileImage']?:$user->getProfileImage();
                            if ($this->validations('update', $decodedRequest)) {
                                $user->setNick($decodedRequest['nick']);
                                $user->setEmail($decodedRequest['email']);
                                $user->setProfileImage($decodedRequest['profileImage']);
                                $user->setUpdatedAt(new \DateTime('now'));
                                $user->execute($this->em, $user, 'update');                
                                return $this->json($user);          
                            }
                            return $this->json(['message'=>'Wrong validation'], 400);  
                        }
                        return $this->json(['message'=>'User not found'], 404);
                    }
                    return $this->json(['message'=>'Wrong json'], 400);
                }
                return $this->json(['message'=>'You can\'t modify that user'], 500);
            }
            return $this->json(['message'=>'Wrong id'], 400);
        } catch (\Doctrine\DBAL\Exception\UniqueConstraintViolationException $e) {
            return $this->json(['message'=>$e->getMessage()], 500);
        }          
    }

    /**
     * Función que sube una imagen de perfil
     * @param $request
     * @return JsonResponse
     */
    public function uploadProfileImage(Request $request)
    {
        $image=$request->files->get('file', null);
        if ($image) {
            if($this->validations('uploadProfileImage', null, $image)){
                //Reemplazamos los espacios por guiones
                $imageNameWithoutSpaces=preg_replace('/\s+/', '-', $image->getClientOriginalName());
                //Debemos configurar la fecha y tiempo
                date_default_timezone_set('Europe/Madrid');
                $imageName=date('d-m-Y_H-i-s').'_'.$imageNameWithoutSpaces;
                //Obtenemos la carpeta donde se guardará la imagen de perfil
                $profileImagesDirectory=$this->getParameter('profileImagesDirectory');
                //Movemos la imagen de perfil a esa carpeta
                $image->move($profileImagesDirectory, $imageName);
                return $this->json(['image'=>$imageName], 201);
            }
            return $this->json(['message'=>'Wrong image'], 400);
        }
        return $this->json(['message'=>'You must send an image'], 400);
    }

    /**
     * Función que obtiene una imagen de perfil
     * @param $imageName
     * @param $filesystem
     * @return JsonResponse|Response
     */
    public function getProfileImage($imageName, Filesystem $filesystem)
    {
        $imageName=trim($imageName);
        if ($imageName) {           
            //Obtenemos la carpeta donde se guardará la imagen de perfil
            $profileImagesDirectory=$this->getParameter('profileImagesDirectory');
            if($filesystem->exists($profileImagesDirectory.'/'.$imageName)){
                //Obtenemos la imagen
                $image=readfile($profileImagesDirectory.'/'.$imageName);
                return new Response($image);
            }
            return $this->json(['message'=>'Image not found'], 404);
        }
        return $this->json(['message'=>'You must send an image name'], 400);
    }

    /**
     * Función que obtiene un usuario
     * @param $id
     * @return JsonResponse
     */
    public function getUserDetail($id)
    {
        if ($this->idValidation($id)) {
            $user=$this->userRepo->find($id);
            if ($user) return $this->json($user);
            return $this->json(['message'=>'User not found'], 404);
        }
        return $this->json(['message'=>'Wrong id'], 400);
    }

    /**
     * Función que obtiene los roles
     * @return JsonResponse
     */
    public function getRoles()
    {
        return $this->json(['ROLE_WRITER', 'ROLE_READER']);
    }

    /**
     * Función que banea a un usuario
     * @param $id
     * @param $request
     * @return JsonRespose
     */
    public function ban($id, Request $request)
    {
        if ($this->idValidation($id)) {
            $request=$request->get('json', true);
            if ($request) {
                $decodedRequest=json_decode($request, true);
                $decodedRequest['ban']=trim($decodedRequest['ban']);
                if ($decodedRequest['ban']=='yes') {
                    $user=$this->userRepo->find($id);
                    //Si existe
                    if ($user) {
                        $user->setBanned(true);
                        $user->execute($this->em, $user, 'update');
                        return $this->json($user);
                    }
                    return $this->json(['message'=>'User not found'], 404);
                }
                return $this->json(['message'=>'You must be send yes as value'], 400); 
            }
            return $this->json(['message'=>'Wrong json'], 400);  
        }
        return $this->json(['message'=>'Wrong id'], 400);
    }

    /**
     * Función que elimina el token
     * @return JsonResponse
     */
    public function logout()
    {
        $response=new JsonResponse(['message'=>'Logout successfully']);
        $response->headers->clearCookie('token', '/', null, true, true, 'none');
        return $response;
    }

    /**
     * Función que valida los datos
     * @param $action
     * @param $decodedRequest
     * @param $image
     * @return
     */
    public function validations($action, $decodedRequest, $image=null)
    {
        //Instanciamos el validador
        $validator=Validation::createValidator();
        if ($action=='register') {
            //Si no hay errores
            if (count($this->nickValidation($validator, $decodedRequest['nick']))==0
            &&count($this->emailValidation($validator, $decodedRequest['email']))==0
            &&count($this->passwordValidation($validator, $decodedRequest['password']))==0)
                return true;
            return false;
        }else if($action=='update'){
            if (count($this->nickValidation($validator, $decodedRequest['nick']))==0
            &&count($this->emailValidation($validator, $decodedRequest['email']))==0) 
                return true;
            return false;   
        }else if($action=='uploadProfileImage'){
            if (count($this->profileImageValidation($validator, $image))==0) 
                return true;
            return false;
        }
    }

    /**
     * Función que valida el id de la ruta
     * @param $id
     * @return bool
     */
    public function idValidation($id): Bool
    {
        if (is_numeric($id)) return true;
        return false;
    }

    /**
     * Función que valida el nick
     * @param $validator
     * @param $nick
     * @return 
     */
    public function nickValidation($validator, $nick)
    {
        $nickValidation=$validator->validate($nick, 
            [
                new Assert\NotBlank(),
                new Assert\Length(
                    [
                        'max'=>50
                    ]
                )
            ]
        );
        return $nickValidation;
    }

    /**
     * Función que valida el email
     * @param $validator
     * @param $email
     * @return 
     */
    public function emailValidation($validator, $email)
    {
        $emailValidation=$validator->validate($email, 
            [
                new Assert\NotBlank(),
                new Assert\Email(),
                new Assert\Length(
                    [
                        'max'=>50
                    ]
                )
            ]
        );
        return $emailValidation;
    }

    /**
     * Función que valida la contraseña
     * @param $validator
     * @param $password
     * @return 
     */
    public function passwordValidation($validator, $password)
    {
        $passwordValidation=$validator->validate($password, 
            [
                new Assert\NotBlank(),
                new Assert\Regex(
                    [
                        'pattern'=>'/^[\s]+$/',
                        'match'=>false
                    ]
                ),
                new Assert\Length(
                    [
                        'max'=>255
                    ]
                ) 
            ]
        );
        return $passwordValidation;
    }

    /**
     * Función que valida la imagen de perfil
     * @param $validator
     * @param $profileImage
     * @return
     */
    public function profileImageValidation($validator, $profileImage)
    {
        $profileImageValidation=$validator->validate($profileImage, new Assert\Image());
        return $profileImageValidation;
    }
}
