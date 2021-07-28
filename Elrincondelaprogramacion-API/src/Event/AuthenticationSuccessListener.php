<?php 
    namespace App\Event;
    use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
    use Symfony\Component\Security\Core\User\UserInterface;
    
    class AuthenticationSuccessListener{

        /**
         * @param AuthenticationSuccessEvent $event
         */
        public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
        {
            $data = $event->getData();
            $user = $event->getUser();
            if (!$user instanceof UserInterface) return;   
            $user->setCreatedAt($user->getCreatedAt()->format('d/m/Y H:i:s')); 
            $user->setUpdatedAt($user->getUpdatedAt()->format('d/m/Y H:i:s')); 
            $event->setData([$user]);
        }
    }
?>