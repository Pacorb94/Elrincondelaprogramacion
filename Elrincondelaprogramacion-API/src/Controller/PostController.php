<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\Post;
use App\Entity\Comment;
use Symfony\Component\Filesystem\Filesystem;

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
            if ($this->validations('create', $decodedRequest)) {
                $postRepo=$this->getDoctrine()->getRepository(Post::class);
                //Si no existe
                if (!$postRepo->findOneBy(['title'=>$decodedRequest['title']])) {
                    $userLoggedIn=$this->get('security.token_storage')->getToken()->getUser();
                    $post=new Post($decodedRequest['title'], $decodedRequest['content'], false, null, 
                        $userLoggedIn);
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
        
    }

    

    /**
     * Función que obtiene los posts
     * @return JsonResponse
     */
    public function getPosts()
    {
        $postRepo=$this->getDoctrine()->getRepository(Post::class);
        $posts=$postRepo->findAll();
        return $this->json($posts);
    }

    /**
     * Función que obtiene un post
     * @param $id
     * @return JsonResponse
     */
    public function getPost($id)
    {
        if ($this->idValidation($id)) {
            $postRepo=$this->getDoctrine()->getRepository(Post::class);
            $post=$postRepo->find($id);
            //Si existe
            if ($post) return $this->json($post);
            return $this->json(['code'=>404, 'message'=>'Post not found']);
        }
        return $this->json(['code'=>400, 'message'=>'Wrong id']);  
    }

    /**
     * Función que borra un comentario
     * @param $id
     * @return JsonResponse
     */
    public function delete($id)
    {
        if ($this->idValidation($id)) {
            $postRepo=$this->getDoctrine()->getRepository(Post::class);
            $post=$postRepo->find($id);
            //Si existe
            if ($post) {
                $em=$this->getDoctrine()->getManager();
                $commentRepo=$this->getDoctrine()->getRepository(Comment::class);
                //Para borrar un post debemos borrar antes sus comentarios
                $comments=$commentRepo->findBy(['post_id'=>$id]);
                foreach ($comments as $comment) $comment->execute($em, $comment, 'delete');
                $post->execute($em, $post, 'delete');
                return $this->json(['message'=>'Post deleted']);
            }
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
    public function validations($action, $decodedRequest, $image=null)
    {
        //Instanciamos el validador
        $validator=Validation::createValidator();
        if ($action=='create') {
            //Si no hay errores
            if (count($this->titleValidation($validator, $decodedRequest['title']))==0
            &&count($this->contentValidation($validator, $decodedRequest['content']))==0)
                return true;
            return false;
        }else if($action=='update'){
            if (count($this->titleValidation($validator, $decodedRequest['title']))==0
            &&count($this->contentValidation($validator, $decodedRequest['content']))==0) 
                return true;
            return false;   
        }else if($action=='uploadImage'){
            if (count($this->imageValidation($validator, $image))==0) 
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
