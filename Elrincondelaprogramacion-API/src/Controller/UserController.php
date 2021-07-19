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
     * @return JsonResponse
     */
    public function register(Request $request)
    {
        $request=$request->get('json', null);
        if ($request) {
            $decodedRequest=json_decode($request);
            if ($this->validations($decodedRequest, 'register')) {
                $userRepo=$this->getDoctrine()->getRepository(User::class);
                //Si no existe
                if (!$userRepo->findOneBy(['email'=>$decodedRequest->email])) {
                    $encryptedPassword=hash('sha256', $decodedRequest->password);
                    $user=new User($decodedRequest->nick, $decodedRequest->email, $encryptedPassword, null, 
                        [$decodedRequest->role], new \DateTime('now'), new \DateTime('now'));
                    $em=$this->getDoctrine()->getManager();
                    $user->execute($em, $user, 'insert');
                    return $this->json($user, 201);
                }
                return $this->json(['code'=>500, 'message'=>'That user already exists']);
            }
            return $this->json(['code'=>400, 'message'=>'Bad request']);      
        }
        return $this->json(['code'=>400, 'message'=>'Wrong json']);
    }

    /**
     * Función que agrupa los validadores de las funciones registrar e iniciar sesión
     * @param $decodedRequest
     * @param $action
     * @return
     */
    public function validations($decodedRequest, $action)
    {
        //Instanciamos el validador
        $validator=Validation::createValidator();
        if ($action=='register') {
            //Si no hay errores
            if (count($this->nickValidation($validator, $decodedRequest->nick))==0
            &&count($this->emailValidation($validator, $decodedRequest->email))==0
            &&count($this->passwordValidation($validator, $decodedRequest->password))==0)
                return true;
            return false;
        }else if($action=='login'){
            if (count($this->emailValidation($validator, $decodedRequest->email))==0
            &&count($this->passwordValidation($validator, $decodedRequest->password))==0) 
                return true;
            return false; 
        }   
    }

    /**
     * Función que valida el id de la ruta
     * @param $id
     * @return Bool
     */
    public function idValidation($id): Bool
    {
        if (is_numeric($id)) return true;
        return false;
    }

    /**
     * Función que valida el nick
     * @param $validator
     * @param $nick
     * @return 
     */
    public function nickValidation($validator, $nick)
    {
        $nickValidation=$validator->validate($nick, 
            [
                new Assert\NotBlank(),
                new Assert\Length(
                    [
                        'max'=>150
                    ]
                )
            ]
        );
        return $nickValidation;
    }

    /**
     * Función que valida el email
     * @param $validator
     * @param $email
     * @return 
     */
    public function emailValidation($validator, $email)
    {
        $emailValidation=$validator->validate($email, 
            [
                new Assert\NotBlank(),
                new Assert\Email(),
                new Assert\Length(
                    [
                        'max'=>255
                    ]
                )
            ]
        );
        return $emailValidation;
    }

    /**
     * Función que valida la contraseña
     * @param $validator
     * @param $password
     * @return 
     */
    public function passwordValidation($validator, $password)
    {
        $passwordValidation=$validator->validate($password, 
            [
                new Assert\NotBlank(),
                new Assert\Regex(
                    [
                        'pattern'=>'/^[\s]+$/',
                        'match'=>false
                    ]
                ),
                new Assert\Length(
                    [
                        'max'=>255
                    ]
                ) 
            ]
        );
        return $passwordValidation;
    }
}
