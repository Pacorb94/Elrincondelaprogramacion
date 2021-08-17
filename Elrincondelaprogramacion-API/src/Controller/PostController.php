<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\User;
use App\Entity\Post;
use App\Entity\Category;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class PostController extends AbstractController
{
    private $postRepo;
    private $categoryRepo;
    private $em;
    private $filesystem;

    public function __construct(EntityManagerInterface $entityManager, Filesystem $filesystem) {
        $this->postRepo=$entityManager->getRepository(Post::class);
        $this->categoryRepo=$entityManager->getRepository(Category::class);
        $this->em=$entityManager;
        $this->filesystem=$filesystem;
    }

    /**
     * Función que crea un post
     * @param $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $request=$request->get('json', null);
        if ($request) {
            //Decodificamos a un array
            $decodedRequest=json_decode($request, true);
            /*array_map itera sobre los elementos de $decodedRequest ejecutando 
            la función trim*/
            $decodedRequest=array_map('trim', $decodedRequest);
            if ($this->validations($decodedRequest)) {
                //Si no existe
                if (!$this->postRepo->findOneBy(['title'=>$decodedRequest['title']])) {
                    $userLoggedIn=$this->get('security.token_storage')->getToken()->getUser();
                    $category=$this->categoryRepo->find($decodedRequest['categoryId']);
                    //Si existe
                    if ($category) {
                        $post=new Post($decodedRequest['title'], $decodedRequest['content'], 
                                $category, false, $decodedRequest['image'], $userLoggedIn);
                        $post->execute($this->em, $post, 'insert');
                        return $this->json($post, 201);
                    }
                    return $this->json(['message'=>'That category dont\'t exists'], 404);
                }
                return $this->json(['message'=>'That post already exists'], 500);
            }
            return $this->json(['message'=>'Wrong validation'], 400); 
        }
        return $this->json(['message'=>'Wrong json'], 400);
    }

    /**
     * Función que modifica un post
     * @param $id
     * @param $request
     * @return JsonResponse
     */
    public function update($id, Request $request)
    {
        try {
            if ($this->paramValidation($id, 'id')) {
                $request=$request->get('json', null);
                if ($request) {
                    $decodedRequest=json_decode($request, true);
                    $post=$this->postRepo->find($id);
                    //Si existe 
                    if ($post) {
                        $userLoggedIn=$this->get('security.token_storage')->getToken()->getUser();
                        //Si el post es del usuario logueado
                        if ($userLoggedIn->getId()==$post->getUser()->getId()) {
                            /*?: indica que $decodedRequest['title'] si tiene valor será ese 
                            sino $post->getTitle()*/
                            $decodedRequest['title']=trim($decodedRequest['title'])?:$post->getTitle();  
                            $decodedRequest['content']=trim($decodedRequest['content'])?:$post->getContent();
                            $decodedRequest['image']=trim($decodedRequest['image'])?:$post->getImage();
                            $category=$this->categoryRepo->find($decodedRequest['category']['id'])
                                ?:$post->getCategory()->getId();
                            if ($this->validations($decodedRequest)) {                
                                $post->setTitle($decodedRequest['title']);  
                                $post->setContent($decodedRequest['content']);
                                $post->setCategory($category);
                                $this->deleteDirectoryOldImage($post->getImage(), 
                                    './../public/images-posts');
                                $post->setImage($decodedRequest['image']);
                                $post->setUpdatedAt(new \DateTime('now'));
                                $post->execute($this->em, $post, 'update');
                                return $this->json($post);
                            } 
                            return $this->json(['message'=>'Wrong validation'], 400);       
                        }
                        return $this->json(['message'=>'You can\'t modify that post'], 400);                        
                    }
                    return $this->json(['message'=>'Post not found'], 404);     
                }
                return $this->json(['message'=>'Wrong json'], 400); 
            }
            return $this->json(['message'=>'Wrong id'], 400);             
        } catch (\Doctrine\DBAL\Exception\UniqueConstraintViolationException $e) {
            return $this->json(['message'=>$e->getMessage()], 500);
        }
    }

    /**
     * Función que borra la antigua imagen del directorio
     * @param $oldImageName
     * @param $folderPath
     */
    public function deleteDirectoryOldImage($oldImageName, $folderPath)
    {
        if ($this->filesystem->exists($folderPath.'/'.$oldImageName)) {
            $this->filesystem->remove($folderPath.'/'.$oldImageName);    
        }   
    }

    /**
     * Función que sube una imagen
     * @param $request
     * @return JsonResponse
     */
    public function uploadImage(Request $request)
    {
        $image=$request->files->get('file');
        if ($image) {
            if ($this->validations(null, 'uploadImage', $image)) {
                //Reemplazamos los espacios por guiones
                $imageNameWithoutSpaces=preg_replace('/\s+/', '-', $image->getClientOriginalName());
                //Debemos configurar la fecha y tiempo
                date_default_timezone_set('Europe/Madrid');
                $imageName=date('d-m-Y_H-i-s').'_'.$imageNameWithoutSpaces;
                //Obtenemos la carpeta donde se guardará la imagen
                $postsImagesDirectory=$this->getParameter('postsImagesDirectory');
                //Movemos la imagen de perfil a esa carpeta
                $image->move($postsImagesDirectory, $imageName);
                return $this->json(['image'=>$imageName], 201);
            }
            return $this->json(['message'=>'Wrong image'], 400);
        }
        return $this->json(['message'=>'You must send an image'], 400); 
    }

    /**
     * Función que obtiene una imagen
     * @param $imageName
     * @return JsonResponse|Response
     */
    public function getImage($imageName)
    {
        $imageName=trim($imageName);
        if ($imageName) {
            //Obtenemos la carpeta donde se guardará la imagen
            $postsImagesDirectory=$this->getParameter('postsImagesDirectory');
            if ($this->filesystem->exists($postsImagesDirectory.'/'.$imageName)) {
                //Obtenemos la imagen
                $image=readfile($postsImagesDirectory.'/'.$imageName);
                return new Response($image);
            }
            return $this->json(['message'=>'Image not found'], 404);
        }
        return $this->json(['message'=>'You must send an image name'], 400); 
    }

    /**
     * Función que obtiene los posts del usuario
     * @param $userId
     * @return JsonResponse
     */
    public function getUserPosts($userId)
    {
        if ($this->idValidation($userId)) {
            $userRepo=$this->getDoctrine()->getRepository(User::class);
            $user=$userRepo->find($userId);
            //Si existe
            if ($user) {
                $posts=$this->postRepo->findBy(['user'=>$userId], ['id'=>'DESC']);
                return $this->json($posts);
            }
            return $this->json(['message'=>'User not found'], 404);
        }
        return $this->json(['message'=>'Wrong id'], 400);
    }

    /**
     * Función que obtiene un post
     * @param $title
     * @return JsonResponse
     */
    public function getPostDetail($title)
    {
        if ($this->paramValidation($title, 'string')) {
            $post=$this->postRepo->findOneBy(['title'=>$title]);
            //Si existe
            if ($post) {
                /*Como los posts almacenan un array de comentarios por lo tanto no se puede serializar
                correctamente debemos devolver la respuesta así*/
                return $this->json($post, 200, [], 
                    [ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER=>function(){}]
                );
            }
            return $this->json(['message'=>'Post not found'], 404);
        }
        return $this->json(['message'=>'Wrong title'], 400);  
    }

    /**
     * Función que marca un post como inadecuado o lo desmarca
     * @param $title
     * @param $request
     * @return JsonResponse
     */
    public function inadequate($title, Request $request)
    {
        if ($this->paramValidation($title, 'string')) {
            $request=$request->get('json', null);
            if ($request) {
                $decodedRequest=json_decode($request, true);
                $decodedRequest['inadequate']=trim($decodedRequest['inadequate']);
                if ($decodedRequest['inadequate']||$decodedRequest['inadequate']=='no') {
                    $post=$this->postRepo->findOneBy(['title'=>$title]);
                    //Si existe
                    if ($post) {
                        $inadequate=($decodedRequest['inadequate']=='yes')?true:false;
                        $post->setInadequate($inadequate);
                        $post->execute($this->em, $post, 'update');
                        return $this->json($post);
                    }
                    return $this->json(['message'=>'Post not found'], 404);
                }
                return $this->json(['message'=>'You must send yes or no as values'], 400);    
            }
            return $this->json(['message'=>'Wrong json'], 400);   
        }
        return $this->json(['message'=>'Wrong title'], 400); 
    }

    /**
     * Función que borra un post
     * @param $id
     * @return JsonResponse
     */
    public function delete($id)
    {
        if ($this->paramValidation($id, 'id')) {
            $post=$this->postRepo->find($id);
            //Si existe
            if ($post) {
                $post->execute($this->em, $post, 'delete');
                return $this->json(['message'=>'Deleted post']);
            }
            return $this->json(['message'=>'Post not found'], 404);
        }
        return $this->json(['message'=>'Wrong id'], 400);  
    }

    /**
     * Función que valida los datos
     * @param $action
     * @param $decodedRequest
     * @param $image
     * @return
     */
    public function validations($decodedRequest, $action='', $image=null)
    {
        //Instanciamos el validador
        $validator=Validation::createValidator();
        if($action=='uploadImage'){
            if (count($this->imageValidation($validator, $image))==0) 
                return true;
            return false;
        }else{
            if (count($this->titleValidation($validator, $decodedRequest['title']))==0
            &&count($this->contentValidation($validator, $decodedRequest['content']))==0) 
                return true;
            return false;   
        }
    }

    /**
     * Función que valida el título
     * @param $validator
     * @param $title
     * @return
     */
    public function titleValidation($validator, $title)
    {
        $titleValidation=$validator->validate($title, 
            [
                new Assert\NotBlank(),
                new Assert\Length(
                    [
                        'max'=>255
                    ]
                ) 
            ]
        );
        return $titleValidation;
    }

    /**
     * Función que valida el contenido
     * @param $validator
     * @param $content
     * @return
     */
    public function contentValidation($validator, $content)
    {
        $contentValidation=$validator->validate($content, new Assert\NotBlank());
        return $contentValidation;
    }

     /**
     * Función que valida la categoría
     * @param $validator
     * @param $category
     * @return
     */
    public function categoryValidation($validator, $category)
    {
        $categoryValidation=$validator->validate($category, 
            [
                new Assert\NotBlank(),
                new Assert\Length(
                    [
                        'max'=>50
                    ]
                ) 
            ]
        );
        return $categoryValidation;
    }

    /**
     * Función que valida la imagen
     * @param $validator
     * @param $image
     * @return
     */
    public function imageValidation($validator, $image)
    {
        $imageValidation=$validator->validate($image, new Assert\Image());
        return $imageValidation;
    }

    /**
     * Función que valida un parámetro de la ruta
     * @param $param
     * @param $type
     * @return bool
     */
    public function paramValidation($param, $type): Bool
    {
        if ($type=='id') {
            if (is_numeric($param)) return true;
            return false;
        }else if($type=='string'){
            if ($param) return true;
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
}
