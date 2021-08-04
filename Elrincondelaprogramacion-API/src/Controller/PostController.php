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
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;


class PostController extends AbstractController
{

    public function __construct(PaginatorInterface $paginator) {
        $this->paginator = $paginator;
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
                $postRepo=$this->getDoctrine()->getRepository(Post::class);
                //Si no existe
                if (!$postRepo->findOneBy(['title'=>$decodedRequest['title']])) {
                    $userLoggedIn=$this->get('security.token_storage')->getToken()->getUser();
                    $categoryRepo=$this->getDoctrine()->getRepository(Category::class);
                    $category=$categoryRepo->findOneBy(['name'=>$decodedRequest['category']]);
                    $post=new Post($decodedRequest['title'], $decodedRequest['content'], 
                        $category, false, null, $userLoggedIn, new \DateTime('now'));
                    $em=$this->getDoctrine()->getManager();
                    $post->execute($em, $post, 'insert');
                    return $this->json(['message'=>'Post created'], 201);
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
            if ($this->idValidation($id)) {
                $request=$request->get('json', null);
                if ($request) {
                    $decodedRequest=json_decode($request, true);
                    /*array_map itera sobre los elementos de $decodedRequest ejecutando 
                    la función trim*/
                    $decodedRequest=array_map('trim', $decodedRequest);
                    $postRepo=$this->getDoctrine()->getRepository(Post::class);
                    $post=$postRepo->find($id);
                    //Si existe 
                    if ($post) {
                        $userLoggedIn=$this->get('security.token_storage')->getToken()->getUser();
                        //Si el post es del usuario logueado
                        if ($userLoggedIn->getId()==$post->getUser()->getId()) {
                            /*?: indica que $decodedRequest['title'] si tiene valor será ese 
                            sino $post->getTitle()*/
                            $decodedRequest['title']=$decodedRequest['title']?:$post->getTitle();  
                            $decodedRequest['content']=$decodedRequest['content']?:$post->getContent();
                            $categoryRepo=$this->getDoctrine()->getRepository(Category::class);
                            $category=$categoryRepo->findOneBy(['name'=>$decodedRequest['category']])
                                ?:$post->getCategory();
                            if ($this->validations($decodedRequest)) {                
                                $post->setTitle($decodedRequest['title']);  
                                $post->setContent($decodedRequest['content']);
                                $post->setCategory($category);
                                $post->setUpdatedAt(new \DateTime('now'));
                                $em=$this->getDoctrine()->getManager();
                                $post->execute($em, $post, 'update');
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
     * Función que sube una imagen
     * @param $request
     * @return JsonResponse
     */
    public function uploadImage(Request $request)
    {
        $image=$request->files->get('file0');
        if ($image) {
            if ($this->validations(null, 'uploadImage', $image)) {
                //Debemos configurar la fecha y tiempo
                date_default_timezone_set('Europe/Madrid');
                $imageName=date('d-m-Y_H-i-s').'_'.$image->getClientOriginalName();
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
     * @param $filesystem
     * @return JsonResponse|Response
     */
    public function getImage($imageName, Filesystem $filesystem)
    {
        $imageName=trim($imageName);
        if ($imageName) {
            //Obtenemos la carpeta donde se guardará la imagen
            $postsImagesDirectory=$this->getParameter('postsImagesDirectory');
            if ($filesystem->exists($postsImagesDirectory.'/'.$imageName)) {
                //Obtenemos la imagen
                $image=readfile($postsImagesDirectory.'/'.$imageName);
                return new Response($image);
            }
            return $this->json(['message'=>'Image not found'], 404);
        }
        return $this->json(['message'=>'You must send an image name'], 400); 
    }

    /**
     * Función que obtiene todos los posts
     * @return JsonResponse
     */
    public function getPosts()
    {
        $postRepo=$this->getDoctrine()->getRepository(Post::class);
        $posts=$postRepo->findAll();
        return $this->json($posts);
    }

    /**
     * Función que obtiene los posts del usuario
     * @param $userId
     * @param $request
     * @return JsonResponse
     */
    public function getUserPosts($userId, Request $request)
    {
        if ($this->idValidation($userId)) {
            $userRepo=$this->getDoctrine()->getRepository(User::class);
            $user=$userRepo->find($userId);
            //Si existe
            if ($user) {
                $data=$this->paginate($request, 'user', $userId, 'Post');
                return $this->json($data);
            }
            return $this->json(['message'=>'User not found'], 404);
        }
        return $this->json(['message'=>'Wrong id'], 400);
    }

    /**
     * Función que obtiene los posts por categoría
     * @param $categoryId
     * @param $request
     * @return JsonResponse
     */
    public function getPostsByCategory($categoryId, Request $request)
    {
        if ($this->idValidation($categoryId)) {
            $categoryRepo=$this->getDoctrine()->getRepository(Category::class);
            $category=$categoryRepo->find($categoryId);
            //Si existe
            if ($category) {
                $data=$this->paginate($request, 'category', $categoryId, 'Post');
                return $this->json($data);
            }
            return $this->json(['message'=>'Category not found'], 404);
        }
        return $this->json(['message'=>'Wrong id'], 400);
    }

    /**
     * Función que obtiene los objetos paginados
     * @param $request
     * @param $modelProperty
     * @param $id
     * @param $modelName
     * @return
    */
    public function paginate($request, $modelProperty, $id, $modelName)
    {
        /*Como el parámetro página viene por GET usamos la propiedad "query" y por defecto si 
        no viene nada tendrá el valor 1*/
        $page=$request->query->getInt('page', 1);
        //Paginator necesita sentencias en DQL
        $dql="select v from App\Entity\\".$modelName." v where v.$modelProperty = $id order by v.id desc";
        $query=$this->getDoctrine()->getManager()->createQuery($dql);
        //Los objetos por página que se verán
        define('OBJECTSPERPAGE', 5);
        $pagination=$this->paginator->paginate($query, $page, OBJECTSPERPAGE);
        $totalObjects=$pagination->getTotalItemCount();
        $data=[
            'total'.$modelName.''.'s'=>$totalObjects,
            'currentPage'=>$page,
            'objectsPerPage'=>OBJECTSPERPAGE, 
            'totalPages'=>ceil($totalObjects/OBJECTSPERPAGE),
            $modelName.'s'=>$pagination
        ];
        return $data;
    }

    /**
     * Función que obtiene un post
     * @param $id
     * @return JsonResponse
     */
    public function getPostDetail($id)
    {
        if ($this->idValidation($id)) {
            $postRepo=$this->getDoctrine()->getRepository(Post::class);
            $post=$postRepo->find($id);
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
        return $this->json(['message'=>'Wrong id'], 400);  
    }

    /**
     * Función que marca un post como inadecuado o lo desmarca
     * @param $id
     * @param $request
     * @return JsonResponse
     */
    public function inadequate($id, Request $request)
    {
        if ($this->idValidation($id)) {
            $request=$request->get('json', null);
            if ($request) {
                $decodedRequest=json_decode($request, true);
                $decodedRequest['inadequate']=trim($decodedRequest['inadequate']);
                if ($decodedRequest['inadequate']||$decodedRequest['inadequate']=='no') {
                    $postRepo=$this->getDoctrine()->getRepository(Post::class);
                    $post=$postRepo->find($id);
                    //Si existe
                    if ($post) {
                        $inadequate=($decodedRequest['inadequate']=='yes')?true:false;
                        $post->setInadequate($inadequate);
                        $em=$this->getDoctrine()->getManager();
                        $post->execute($em, $post, 'update');
                        return $this->json($post);
                    }
                    return $this->json(['message'=>'Post not found'], 404);
                }
                return $this->json(['message'=>'You must send yes or no as values'], 400);    
            }
            return $this->json(['message'=>'Wrong json'], 400);   
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
