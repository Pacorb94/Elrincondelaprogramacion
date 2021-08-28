<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use App\Entity\Category;
use App\Entity\Post;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;


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
     * @param $request
     * @return JsonResponse
     */
    public function getPosts(Request $request)
    {
        $posts=$this->paginate($request, 'Post', 'where m.inadequate=0');
        /*Debido a que dentro de los posts hay una referencia a otros modelos
        dará error por lo que hay que decirle a Symfony qué hacer cuando vea 
        otros modelos*/
        return $this->json($posts, 200, [], [
            ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER=>function(){}
        ]);
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
                $posts=$this->paginate($request, 'Post', 
                    'where m.category='.$category->getId().' and m.inadequate=0');
                /*Debido a que dentro de los posts hay referencias a otros modelos
                dará error por lo que hay que decirle a Symfony qué hacer cuando vea 
                otros modelos*/
                return $this->json($posts, 200, [], [
                    ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER=>function(){}
                ]);
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
     * Función que obtiene los posts más activos
     * @return JsonResponse
     */
    public function getMostActivePosts()
    {
        $postRepo=$this->em->getRepository(Post::class);
        $posts=$postRepo->findBy(['inadequate'=>false]);   
        /*Debido a que dentro de los posts hay una referencia a otros modelos
        dará error por lo que hay que decirle a Symfony qué hacer cuando vea 
        otros modelos*/
        return $this->json($posts, 200, [], [
            ObjectNormalizer::CIRCULAR_REFERENCE_HANDLER=>function(){}
        ]);
    }

    public function array_sort_by_column(&$arr, $col, $dir = SORT_DESC) {
        $sort_col = array();
        foreach ($arr as $key => $row) {
            $sort_col[$key] = $row[$col];
        }
    
        array_multisort($sort_col, $dir, $arr);
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
