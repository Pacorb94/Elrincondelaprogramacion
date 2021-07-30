<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\Post;
use App\Entity\Category;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;


class PostController extends AbstractController
{

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
                    return $this->json(['code'=>201,'message'=>'Post created']);
                }
                return $this->json(['code'=>500 , 'message'=>'That post already exists']);
            }
            return $this->json(['code'=>400, 'message'=>'Wrong validation']); 
        }
        return $this->json(['code'=>400, 'message'=>'Wrong json']);
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
                            return $this->json(['code'=>400, 'message'=>'Wrong validation']);       
                        }
                        return $this->json(['code'=>400, 'message'=>'You can\'t modify that post']);                        
                    }
                    return $this->json(['code'=>404, 'message'=>'Post not found']);     
                }
                return $this->json(['code'=>400, 'message'=>'Wrong json']); 
            }
            return $this->json(['code'=>400, 'message'=>'Wrong id']);             
        } catch (\Doctrine\DBAL\Exception\UniqueConstraintViolationException $e) {
            return $this->json(['code'=>500, 'message'=>$e->getMessage()]);
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
            return $this->json(['code'=>400, 'message'=>'Wrong image']);
        }
        return $this->json(['code'=>400, 'message'=>'You must send an image']); 
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
            return $this->json(['code'=>404, 'message'=>'Image not found']);
        }
        return $this->json(['code'=>400, 'message'=>'You must send an image name']); 
    }

    /**
     * Función que obtiene los posts del usuario
     * @param $userId
     * @param $request
     * @param $paginator
     * @return JsonResponse
     */
    public function getUserPosts($userId, Request $request, PaginatorInterface $paginator)
    {
        if ($this->idValidation($userId)) {
            $data=$this->paginatedPosts($userId, 'user', $request, $paginator);
            return $this->json($data);
        }
        return $this->json(['code'=>400, 'message'=>'Wrong id']);
    }

    /**
     * Función que obtiene los posts por categoría
     * @param $categoryId
     * @param $request
     * @param $paginator
     * @return JsonResponse
     */
    public function getPostsByCategory($categoryId, Request $request, PaginatorInterface $paginator)
    {
        if ($this->idValidation($categoryId)) {
            $data=$this->paginatedPosts($categoryId, 'category', $request, $paginator);
            return $this->json($data);
        }
        return $this->json(['code'=>400, 'message'=>'Wrong id']);
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
            return $this->json(['code'=>404, 'message'=>'Post not found']);
        }
        return $this->json(['code'=>400, 'message'=>'Wrong id']);  
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
                    return $this->json(['code'=>404, 'message'=>'Post not found']);
                }
                return $this->json(['code'=>400, 'message'=>'You must send yes or no as values']);    
            }
            return $this->json(['code'=>400, 'message'=>'Wrong json']);   
        }
        return $this->json(['code'=>400, 'message'=>'Wrong id']); 
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

    /**
     * Función que obtiene los posts paginados
     * @param $id
     * @param $fieldName
     * @param $request
     * @param $paginator
     * @return
     */
    public function paginatedPosts($id, $fieldName, $request, $paginator)
    {
        /*Como el parámetro página viene por GET usamos la propiedad "query" y por defecto si 
        no viene nada tendrá el valor 1*/
        $page=$request->query->getInt('page', 1);
        //Paginator necesita sentencias en DQL
        $dql="select v from App\Entity\Post v where v.$fieldName = $id order by v.id desc";
        $em=$this->getDoctrine()->getManager();
        $query=$em->createQuery($dql);
        //Los posts por página que se verán
        define('POSTSPERPAGE', 5);
        //Llamamos al servicio
        $pagination=$paginator->paginate($query, $page, POSTSPERPAGE);
        $totalPosts=$pagination->getTotalItemCount();
        $data=[
            'postsNumber'=>$totalPosts,
            'currentPage'=>$page,
            'postsPerPage'=>POSTSPERPAGE, 
            'totalPages'=>ceil($totalPosts/POSTSPERPAGE),
            'posts'=>$pagination
        ];
        return $data;
    }
}
