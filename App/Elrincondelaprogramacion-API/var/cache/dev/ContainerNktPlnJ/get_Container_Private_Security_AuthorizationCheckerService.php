<?php

namespace ContainerNktPlnJ;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class get_Container_Private_Security_AuthorizationCheckerService extends App_KernelDevDebugContainer
{
    /**
     * Gets the public '.container.private.security.authorization_checker' shared service.
     *
     * @return \Symfony\Component\Security\Core\Authorization\AuthorizationChecker
     */
    public static function do($container, $lazyLoad = true)
    {
        include_once \dirname(__DIR__, 4).'/vendor/symfony/security-core/Authorization/AuthorizationCheckerInterface.php';
        include_once \dirname(__DIR__, 4).'/vendor/symfony/security-core/Authorization/AuthorizationChecker.php';
        include_once \dirname(__DIR__, 4).'/vendor/symfony/security-core/Authentication/AuthenticationManagerInterface.php';
        include_once \dirname(__DIR__, 4).'/vendor/symfony/security-http/Authentication/NoopAuthenticationManager.php';

        return $container->services['.container.private.security.authorization_checker'] = new \Symfony\Component\Security\Core\Authorization\AuthorizationChecker(($container->services['.container.private.security.token_storage'] ?? $container->get_Container_Private_Security_TokenStorageService()), ($container->privates['security.authentication.manager'] ?? ($container->privates['security.authentication.manager'] = new \Symfony\Component\Security\Http\Authentication\NoopAuthenticationManager())), ($container->privates['debug.security.access.decision_manager'] ?? $container->load('getDebug_Security_Access_DecisionManagerService')), false, false, false);
    }
}
