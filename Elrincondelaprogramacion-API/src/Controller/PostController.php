<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\Post;
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
       
    }
}
