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
    private $commentRepo;
    private $em;

    public function __construct() {
        $this->commentRepo=$this->getDoctrine()->getRepository(Comment::class);
        $this->em=$this->getDoctrine()->getManager();
    }

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
                        $comment->execute($this->em, $comment, 'insert');
                        return $this->json(['message'=>'Comment created'], 201);
                    }
                    return $this->json(['message'=>'Post not found'], 404);
                }
            }
            return $this->json(['message'=>'Wrong json'], 400);             
        }
        return $this->json(['message'=>'Wrong id'], 400);
    }

    /**
     * Función que marca como inadecuado un comentario o lo desmarca
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
                if ($decodedRequest['inadequate']=='yes'||$decodedRequest['inadequate']=='no') {
                    $comment=$this->commentRepo->find($id);
                    //Si existe
                    if ($comment) {
                        $inadequate=($decodedRequest['inadequate']=='yes')?true:false;
                        $comment->setInadequate($inadequate);
                        $comment->execute($this->em, $comment, 'update');
                        return $this->json($comment);
                    }
                    return $this->json(['message'=>'Comment not found'], 404);
                }
                return $this->json(['message'=>'You must send yes or no as values'], 400);
            }
            return $this->json(['message'=>'Wrong json'], 400);  
        }
        return $this->json(['message'=>'Wrong id'], 400);
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
