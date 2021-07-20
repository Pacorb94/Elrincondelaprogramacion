<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\Category;

class CategoryController extends AbstractController
{

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
            if (count($this->nameValidation($decodedRequest['name']))==0) {
                $decodedRequest['name']=trim($decodedRequest['name']);
                $categoryRepo=$this->getDoctrine()->getRepository(Category::class);
                if (!$categoryRepo->findOneBy(['name'=>$decodedRequest['name']])) {
                    $category=new Category($decodedRequest['name']);
                    $em=$this->getDoctrine()->getManager();
                    $category->execute($em, $category, 'insert');
                    return $this->json($category, 201);
                }
                return $this->json(['code'=>500, 'message'=>'That name already exists']);
            }
            return $this->json(['code'=>400, 'message'=>'The name is longer than 255 characters']);
        }
        return $this->json(['code'=>400, 'message'=>'Wrong json']);
    }

    /**
     * Función que obtiene las categorías
     * @return JsonResponse
     */
    public function getCategories()
    {
        $categoryRepo=$this->getDoctrine()->getRepository(Category::class);
        $categories=$categoryRepo->findAll();
        return $this->json($categories);
    }

    /**
     * Función que obtiene una categoría
     * @param $id
     * @return JsonResponse
     */
    public function getCategory($id)
    {
        if ($this->idValidation($id)) {
            $categoryRepo=$this->getDoctrine()->getRepository(Category::class);
            $category=$categoryRepo->find($id);
            if ($category) return $this->json($category);
            return $this->json(['code'=>404, 'message'=>'Category not found']);
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
