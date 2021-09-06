<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\Comment;
use App\Entity\Post;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class CommentController extends AbstractController
{
    private $commentRepo;
    private $postRepo;
    private $em;

    public function __construct(EntityManagerInterface $entityManager) {
        $this->commentRepo=$entityManager->getRepository(Comment::class);
        $this->postRepo=$entityManager->getRepository(Post::class);
        $this->em=$entityManager;
    }

    /**
     * Función que crea un comentario
     * @param $postId
     * @param $request
     * @return JsonResponse
     */
    public function create($postId, Request $request)
    {
        if ($this->idValidation($postId)) {
            $request=$request->get('json', null);
            if ($request) {
                //Decodificamos a un array
                $decodedRequest=json_decode($request, true);
                $decodedRequest['content']=trim($decodedRequest['content']);
                if (count($this->contentValidation($decodedRequest['content']))==0) {
                    $post=$this->postRepo->find($postId);
                    //Si existe
                    if ($post) {
                        $userLoggedIn=$this->get('security.token_storage')->getToken()->getUser();
                        $comment=new Comment($userLoggedIn, $post, $decodedRequest['content'], false);
                        $comment->execute($this->em, $comment, 'insert');                     
                        return $this->json(['message'=>'Created comment'], 201);
                    }
                    return $this->json(['message'=>'Post not found'], 404);
                }
                return $this->json(['message'=>'Wrong validation'], 400);
            }
            return $this->json(['message'=>'Wrong json'], 400);             
        }
        return $this->json(['message'=>'Wrong post id'], 400);
    }
    
    /**
     * Función que modifica un comentario
     * @param $id
     * @param $request
     * @return JsonResponse
     */
    public function update($id, Request $request)
    {
        if ($this->idValidation($id)) {
            $request=$request->get('json', null);
            if ($request) {
                $decodedRequest=json_decode($request, true);
                if (count($this->contentValidation($decodedRequest['content']))==0) {
                    $decodedRequest['content']=trim($decodedRequest['content']);
                    $comment=$this->commentRepo->find($id);
                    //Si existe
                    if ($comment) {
                        $userLoggedIn=$this->get('security.token_storage')->getToken()->getUser();
                        //Si es el comentario del usuario que lo creó
                        if ($comment->getUser()->getId()==$userLoggedIn->getId()) {
                            $comment->setContent($decodedRequest['content']);
                            $comment->setUpdatedAt(new \DateTime('now'));
                            $comment->execute($this->em, $comment, 'update');
                            /*Debido a que dentro del comentario hay una referencia a otros modelos
                            dará error por lo que hay que decirle a Symfony qué hacer cuando vea 
                            otros modelos*/
                            return $this->json($comment, 200, [], [
                                ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER=>function(){}
                            ]);
                        }
                        return $this->json(['message'=>'You can\'t update that comment'], 400);
                    }
                    return $this->json(['message'=>'Comment not found'], 404);
                }
                return $this->json(['message'=>'Wrong content'], 400);
            }
            return $this->json(['message'=>'Wrong json'], 400);
        }
        return $this->json(['message'=>'Wrong post id'], 400);
    }

    /**
     * Función que marca como inadecuado un comentario
     * @param $id
     * @return JsonResponse
     */
    public function inadequate($id)
    {
        if ($this->idValidation($id)) {
            $comment=$this->commentRepo->find($id);
            //Si existe
            if ($comment) {
                $comment->setInadequate(true);
                $comment->setUpdatedAt(new \DateTime('now'));
                $comment->execute($this->em, $comment, 'update');
                return $this->json(['message'=>'Comment marked as inadequate']);
            }
            return $this->json(['message'=>'Comment not found'], 404);
        }        
        return $this->json(['message'=>'Wrong id'], 400);
    }
    
    /**
     * Función que obtiene los comentarios inadecuados
     * @return JsonResponse
     */
    public function getInadequates()
    {
        $comments=$this->commentRepo->findBy(['inadequate'=>true], ['updatedAt'=>'DESC']);
        /*Debido a que dentro de los comentarios hay una referencia a otros modelos
        dará error por lo que hay que decirle a Symfony qué hacer cuando vea 
        otros modelos*/
        return $this->json($comments, 200, [], [
            ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER=>function(){}
        ]);
    }
    
    /**
     * Función que borra un comentario
     * @param $id
     * @return JsonResponse
     */
    public function delete($id)
    {
        if ($this->idValidation($id)) {
            $comment=$this->commentRepo->find($id);
            if ($comment) {
                $userLoggedIn=$this->get('security.token_storage')->getToken()->getUser();
                //Si es el comentario del usuario que lo creó
                if ($comment->getUser()->getId()==$userLoggedIn->getId()) {
                    $comment->execute($this->em, $comment, 'delete');
                    return $this->json(['message'=>'Deleted comment']);
                }
                return $this->json(['message'=>'You can\'t delete that comment'], 400);
            }
            return $this->json(['message'=>'Comment not found'], 404);
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
