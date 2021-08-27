<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use App\Entity\Category;
use Symfony\Component\HttpFoundation\Request;

class HomeController extends AbstractController
{
    private $categoryRepo;
    private $paginator;
    private $em;

    public function __construct(EntityManagerInterface $entityManager, PaginatorInterface $paginator) {    
        $this->categoryRepo=$entityManager->getRepository(Category::class);
        $this->paginator=$paginator;
        $this->em=$entityManager;
    }

    /**
     * Función que obtiene todos los posts
     * @return JsonResponse
     */
    public function getPosts(Request $request)
    {
        $data=$this->paginate($request, 'Post', 'where m.inadequate=0');
        return $this->json($data);
    }

    /**
     * Función que obtiene los posts por categoría
     * @param $categoryName
     * @param $request
     * @return JsonResponse
     */
    public function getPostsByCategory($categoryName, Request $request)
    {
        if ($categoryName) {
            $category=$this->categoryRepo->findOneBy(['name'=>$categoryName]);
            //Si existe
            if ($category) {
                $data=$this->paginate($request, 'Post', 
                    'where m.category='.$category->getId().' and m.inadequate=0');
                return $this->json($data);
            }
            return $this->json(['message'=>'Category not found'], 404);
        }
        return $this->json(['message'=>'Wrong category name'], 400);
    }

    /**
     * Función que obtiene los objetos paginados
     * @param $request
     * @param $modelName
     * @param $where
     * @return
    */
    public function paginate($request, $modelName, $where='')
    {
        /*Como el parámetro página viene por GET usamos la propiedad "query" y por defecto si 
        no viene nada tendrá el valor 1*/
        $page=$request->query->getInt('page', 1);
        //Paginator necesita sentencias en DQL
        $dql="select m from App\Entity\\".$modelName." m $where order by m.id desc";
        $query=$this->em->createQuery($dql);
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
     * Función que obtiene las categorías
     * @return JsonResponse
     */
    public function getCategories()
    {
        $categories=$this->categoryRepo->findAll();
        return $this->json($categories);
    }
}
