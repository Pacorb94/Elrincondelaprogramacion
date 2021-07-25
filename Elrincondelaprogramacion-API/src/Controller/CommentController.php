<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\Comment;
use App\Entity\Post;


class CommentController extends AbstractController
{

    /**
     * Función que crea un comentario
     * @param $postId
     * @param $request
     * @return JsonResponse
     */
    public function create($postId, Request $request)
    {
        if ($postId) {
            $request=$request->get('json', null);
            if ($request) {
                //Decodificamos a un array
                $decodedRequest=json_decode($request, true);
                /*array_map itera sobre los elementos de $decodedRequest ejecutando 
                la función trim*/
                $decodedRequest=array_map('trim', $decodedRequest);
                if (count($this->contentValidation($decodedRequest['content']))==0) {
                    $postRepo=$this->getDoctrine()->getRepository(Post::class);
                    $post=$postRepo->find($postId);
                    //Si existe
                    if ($post) {
                        $userLoggedIn=$this->get('security.token_storage')->getToken()->getUser();
                        $comment=new Comment($userLoggedIn, $post, $decodedRequest['content'], false);
                        $em=$this->getDoctrine()->getManager();
                        $comment->execute($em, $comment, 'insert');
                        return $this->json(['message'=>'Comment created'], 201);
                    }
                    return $this->json(['code'=>404, 'message'=>'Post not found']);
                }
            }
            return $this->json(['code'=>400, 'message'=>'Wrong json']);             
        }
        return $this->json(['code'=>400, 'message'=>'Wrong id']);
    }

    /**
     * Función que marca como inadecuado un comentario
     * @param $id
     * @return JsonResponse
     */
    public function inadequate($id)
    {
        if ($this->idValidation($id)) {
            $commentRepo=$this->getDoctrine()->getRepository(Comment::class);
            $comment=$commentRepo->find($id);
            //Si existe
            if ($comment) {
                $comment->setInadequate(true);
                $em=$this->getDoctrine()->getManager();
                $comment->execute($em, $comment, 'update');
                return $this->json($comment);
            }
            return $this->json(['code'=>404, 'message'=>'Comment not found']);
        }
        return $this->json(['code'=>400, 'message'=>'Wrong id']);
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
     * Función que valida el contenido
     * @param $content
     * @return
     */
    public function contentValidation($content)
    {
        $validator=Validation::createValidator();
        $contentValidation=$validator->validate($content, new Assert\NotBlank());
        return $contentValidation;
    }
}
