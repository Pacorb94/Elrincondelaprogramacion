<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\Category;
use App\Entity\Post;
use Doctrine\ORM\EntityManagerInterface;

class CategoryController extends AbstractController
{
    private $categoryRepo;
    private $em;

    public function __construct(EntityManagerInterface $entityManager) {
        date_default_timezone_set('Europe/Madrid');
        $this->categoryRepo=$entityManager->getRepository(Category::class);
        $this->em=$entityManager;
    }

    /**
     * Función que crea una categoría
     * @param $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $request=$request->get('json', null);
        if ($request) {
            $decodedRequest=json_decode($request, true);
            $decodedRequest['name']=trim($decodedRequest['name']);
            if (count($this->nameValidation($decodedRequest['name']))==0) {
                $decodedRequest['name']=trim($decodedRequest['name']);
                //Si la categoría con ese nombre no existe
                if (!$this->categoryRepo->findOneBy(['name'=>$decodedRequest['name']])) {
                    $userLoggedIn=$this->get('security.token_storage')->getToken()->getUser();
                    //Aunque espera el id del usuario tenemos que pasarle el usuario completo
                    $category=new Category($userLoggedIn, $decodedRequest['name']);
                    $category->execute($this->em, $category, 'insert');
                    return $this->json(['message'=>'Created category'], 201);
                }
                return $this->json(['message'=>'That name already exists'], 500);
            }
            return $this->json(['message'=>'The name is longer than 255 characters'], 400);
        }
        return $this->json(['message'=>'Wrong json'], 400);
    }

    /**
     * Función que modifica una categoría
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
                    $decodedRequest['name']=trim($decodedRequest['name']);
                    if ($this->nameValidation($decodedRequest['name'])) {
                        $category=$this->categoryRepo->find($id);
                        //Si existe
                        if ($category) {
                            //Si la categoría con ese nombre no existe
                            if (!$this->categoryRepo->findOneBy(['name'=>$decodedRequest['name']])) {
                                $userLoggedIn=$this->get('security.token_storage')->getToken()->getUser();
                                //Si el usuario es el que creó la categoría
                                if ($userLoggedIn->getId()==$category->getUser()->getId()) {
                                    $category->setName($decodedRequest['name']);
                                    $category->setUpdatedAt(new \DateTime('now'));
                                    $category->execute($this->em, $category, 'update');
                                    return $this->json($category);   
                                }
                                return $this->json(['message'=>'You can\'t modify that category'], 400);       
                            }
                            return $this->json(['message'=>'That name already exists'], 500);                
                        }
                        return $this->json(['message'=>'Category not found'], 404);
                    }
                    return $this->json(['message'=>'Wrong name'], 400);
                }
                return $this->json(['message'=>'Wrong json'], 400);
            }
            return $this->json(['message'=>'Wrong id'], 400);
        } catch (\Throwable $th) {
            return $this->json(['message'=>$th->getMessage()], 500);
        }           
    }

    /**
     * Función que obtiene una categoría
     * @param $name
     * @return JsonResponse
     */
    public function getCategory($name)
    {
        if ($this->paramValidation($name, 'string')) {
            $category=$this->categoryRepo->findOneBy(['name'=>$name]);
            //Si existe
            if ($category) return $this->json($category);
            return $this->json(['message'=>'Category not found'], 404);
        }
        return $this->json(['message'=>'Wrong name'], 400); 
    }

    /**
     * Función que borra una categoría
     * @param $id
     * @return JsonResponse
     */
    public function delete($id)
    {
        if ($this->paramValidation($id, 'id')) {
            $category=$this->categoryRepo->find($id);
            //Si existe
            if ($category) {
                $userLoggedIn=$this->get('security.token_storage')->getToken()->getUser();
                //Si el usuario es el que creó la categoría o el usuario con nick 'admin'
                if ($userLoggedIn->getId()==$category->getUser()->getId()
                ||$userLoggedIn->getNick()=='admin') {
                    $postRepo=$this->getDoctrine()->getRepository(Post::class);
                    $posts=$postRepo->findBy(['category'=>$category->getId()]);
                    //Debemos modificar la categoría de los posts que vamos a borrar
                    foreach ($posts as $post) {
                        $post->setCategory(null);
                        $post->execute($this->em, $post, 'update');
                    }             
                    $category->execute($this->em, $category, 'delete');
                    return $this->json(['message'=>'Deleted category']);
                }
                return $this->json(['message'=>'You can\'t delete that category'], 400);       
            }
            return $this->json(['message'=>'Category not found'], 404);
        }
        return $this->json(['message'=>'Wrong id'], 400);
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
     * Función que valida el nombre
     * @param $name
     * @return 
     */
    public function nameValidation($name)
    {
        $validator=Validation::createValidator();
        $nameValidation=$validator->validate($name, 
            [
                new Assert\NotBlank(),
                new Assert\Length(
                    [
                        'max'=>255
                    ]
                )
            ]
        );
        return $nameValidation;
    }
}
