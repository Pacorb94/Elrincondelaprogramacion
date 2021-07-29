<?php 
    namespace App\Event;
    use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
    use Symfony\Component\Security\Core\User\UserInterface;
    
    class AuthenticationSuccessListener{

        /**
         * Función que se ejecuta cuando el usuario inicia sesión correctamente.
         * En lugar de devolver el token (acción por defecto) devolvemos el usuario
         * @param AuthenticationSuccessEvent $event
         */
        public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
        {
            $data = $event->getData();
            $user = $event->getUser();
            if (!$user instanceof UserInterface) return;   
            $user->setCreatedAt($user->getCreatedAt()->format('Y-m-d H:i:s')); 
            $user->setUpdatedAt($user->getUpdatedAt()->format('Y-m-d H:i:s')); 
            $event->setData([$user]);
        }
    }
?>