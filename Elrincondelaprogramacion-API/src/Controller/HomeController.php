<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Post;
use App\Entity\Category;

class HomeController extends AbstractController
{
    /**
     * Función que obtiene todos los posts
     * @return JsonResponse
     */
    public function getPosts()
    {
        $postRepo=$this->getDoctrine()->getRepository(Post::class);
        $posts=$postRepo->findAll();
        return $this->json($posts);
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
