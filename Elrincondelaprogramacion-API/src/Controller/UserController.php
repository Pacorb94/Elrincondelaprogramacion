<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\User;
use Symfony\Component\Filesystem\Filesystem;

class UserController extends AbstractController
{
 
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
            if ($this->validations('register', $decodedRequest)) {
                $userRepo=$this->getDoctrine()->getRepository(User::class);
                //Si no existe
                if (!$userRepo->findOneBy(['email'=>$decodedRequest->email])) {
                    /*array_map itera sobre los elementos de $decodedRequest ejecutando 
                    la función trim*/
                    $decodedRequest=array_map('trim', $decodedRequest);
                    $encryptedPassword=hash('sha256', $decodedRequest['password']);
                    $user=new User($decodedRequest['nick'], $decodedRequest['email'], $encryptedPassword, 
                        null, [$decodedRequest['role']], new \DateTime('now'), new \DateTime('now'));
                    $em=$this->getDoctrine()->getManager();
                    $user->execute($em, $user, 'insert');
                    return $this->json($user, 201);
                }
                return $this->json(['code'=>500, 'message'=>'That user already exists']);
            }
            return $this->json(['code'=>400, 'message'=>'Wrong field']);      
        }
        return $this->json(['code'=>400, 'message'=>'Wrong json']);
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
                $tokenId=$this->get('security.token_storage')->getToken()->getUser()->getId();
                //Si el usuario que modificamos es el nuestro
                if ($tokenId==$id) {
                    $request=$request->get('json', null);
                    if ($request) {
                        $userRepo=$this->getDoctrine()->getRepository(User::class);
                        $user=$userRepo->findOneBy(['id'=>$id]);
                        //Si existe el usuario
                        if ($user) {
                            //Con true decodificamos la petición a un array
                            $decodedRequest=json_decode($request, true);
                            /*array_map itera sobre los elementos de $decodedRequest ejecutando 
                            la función trim*/
                            $decodedRequest=array_map('trim', $decodedRequest);
                            /*?: indica que $decodedRequest->nick si tiene valor será ese 
                            sino $user->getNick()*/
                            $decodedRequest['nick']=$decodedRequest['nick']?:$user->getNick();
                            $decodedRequest['email']=$decodedRequest['email']?:$user->getEmail();
                            if (!$this->validations('update', $decodedRequest)) 
                                return $this->json(['code'=>400, 'message'=>'Wrong validation']);
                            $user->setNick($decodedRequest['nick']);
                            $user->setEmail($decodedRequest['email']);
                            $em=$this->getDoctrine()->getManager();
                            $user->execute($em, $user, 'update');
                            return $this->json($user);                          
                        }
                        return $this->json(['code'=>404, 'message'=>'User not found']);
                    }
                    return $this->json(['code'=>400, 'message'=>'Wrong json']);
                }
                return $this->json(['code'=>400, 'message'=>'You can\'t modify that user']);
            }
            return $this->json(['code'=>400, 'message'=>'Wrong id']);
        } catch (\Throwable $th) {
            return $this->json(['code'=>500, 'message'=>$th->getMessage()]);
        }          
    }

    /**
     * Función que sube una imagen de perfil
     * @param $request
     * @return JsonResponse
     */
    public function uploadProfileImage(Request $request)
    {
        $image=$request->files->get('file0', null);
        if ($image) {;
            if($this->validations('uploadProfileImage', null, $image)){
                //Debemos configurar la fecha y tiempo
                date_default_timezone_set('Europe/Madrid');
                $imageName=date('d-m-Y_H-i-s').'_'.$image->getClientOriginalName();
                //Obtenemos la carpeta donde se guardará la imagen de perfil
                $profileImagesDirectory=$this->getParameter('profileImagesDirectory');
                //Movemos la imagen de perfil a esa carpeta
                $image->move($profileImagesDirectory, $imageName);
                return $this->json(['image'=>$imageName], 201);
            }
            return $this->json(['code'=>400, 'message'=>'Wrong image']);
        }
    }

    /**
     * Función que obtiene una imagen de perfil
     * @param $imageName
     * @return JsonResponse
     */
    public function getProfileImage($imageName)
    {
        if ($imageName) {
            $filesystem=new Filesystem();
            //Obtenemos la carpeta donde se guardará la imagen de perfil
            $profileImagesDirectory=$this->getParameter('profileImagesDirectory');
            if($filesystem->exists($profileImagesDirectory.'/'.$imageName)){
                //Obtenemos la imagen
                $image=readfile($profileImagesDirectory.'/'.$imageName);
                return new Response($image);
            }
            return $this->json(['code'=>404, 'message'=>'Image not found']);
        }
        return $this->json(['code'=>400, 'message'=>'You must send an image name']);
    }

    /**
     * Función que valida los datos del registro
     * @param $action
     * @param $decodedRequest
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
