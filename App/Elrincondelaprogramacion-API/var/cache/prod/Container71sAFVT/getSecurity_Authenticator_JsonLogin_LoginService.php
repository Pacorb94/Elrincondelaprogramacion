<?php

namespace Container71sAFVT;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/*
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class getSecurity_Authenticator_JsonLogin_LoginService extends App_KernelProdContainer
{
    /*
     * Gets the private 'security.authenticator.json_login.login' shared service.
     *
     * @return \Symfony\Component\Security\Http\Authenticator\JsonLoginAuthenticator
     */
    public static function do($container, $lazyLoad = true)
    {
        $a = ($container->services['event_dispatcher'] ?? $container->getEventDispatcherService());

        $container->privates['security.authenticator.json_login.login'] = $instance = new \Symfony\Component\Security\Http\Authenticator\JsonLoginAuthenticator(($container->privates['security.http_utils'] ?? $container->load('getSecurity_HttpUtilsService')), ($container->privates['security.user.provider.concrete.app_user_provider'] ?? $container->load('getSecurity_User_Provider_Concrete_AppUserProviderService')), new \Symfony\Component\Security\Http\Authentication\CustomAuthenticationSuccessHandler(new \Lexik\Bundle\JWTAuthenticationBundle\Security\Http\Authentication\AuthenticationSuccessHandler(($container->services['lexik_jwt_authentication.jwt_manager'] ?? $container->load('getLexikJwtAuthentication_JwtManagerService')), $a, new RewindableGenerator(function () use ($container) {
            yield 0 => ($container->privates['lexik_jwt_authentication.cookie_provider.token'] ?? $container->load('getLexikJwtAuthentication_CookieProvider_TokenService'));
        }, 1)), [], 'login'), new \Symfony\Component\Security\Http\Authentication\CustomAuthenticationFailureHandler(new \Lexik\Bundle\JWTAuthenticationBundle\Security\Http\Authentication\AuthenticationFailureHandler($a), []), ['check_path' => '/login', 'username_path' => 'email', 'use_forward' => false, 'require_previous_session' => false, 'login_path' => '/login', 'password_path' => 'password'], ($container->privates['property_accessor'] ?? $container->load('getPropertyAccessorService')));

        if ($container->has('translator')) {
            $instance->setTranslator(($container->services['translator'] ?? $container->load('getTranslatorService')));
        }

        return $instance;
    }
}
