<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\User;

class UserController extends AbstractController
{
 
    /**
     * Función que registra un usuario
     * @param $request
     * @return
     */
    public function register(Request $request): JsonResponse
    {
        $request=$request->get('json', null);
        if ($request) {
            
        }
        return $this->json($request);
    }
}
