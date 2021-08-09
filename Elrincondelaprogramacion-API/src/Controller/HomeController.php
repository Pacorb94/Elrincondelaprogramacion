<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Knp\Component\Pager\PaginatorInterface;
use App\Entity\Category;
use Symfony\Component\HttpFoundation\Request;

class HomeController extends AbstractController
{
    public function __construct(PaginatorInterface $paginator) {
        $this->paginator=$paginator;
    }

    /**
     * Función que obtiene todos los posts
     * @return JsonResponse
     */
    public function getPosts(Request $request)
    {
        $data=$this->paginate($request, 'Post');
        return $this->json($data);
    }

    /**
     * Función que obtiene los objetos paginados
     * @param $request
     * @param $modelName
     * @return
    */
    public function paginate($request, $modelName)
    {
        /*Como el parámetro página viene por GET usamos la propiedad "query" y por defecto si 
        no viene nada tendrá el valor 1*/
        $page=$request->query->getInt('page', 1);
        //Paginator necesita sentencias en DQL
        $dql="select v from App\Entity\\".$modelName." v order by v.id desc";
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
     * Función que obtiene las categorías
     * @return JsonResponse
     */
    public function getCategories()
    {
        $categoryRepo=$this->getDoctrine()->getRepository(Category::class);
        $categories=$categoryRepo->findAll();
        return $this->json($categories);
    }
}
