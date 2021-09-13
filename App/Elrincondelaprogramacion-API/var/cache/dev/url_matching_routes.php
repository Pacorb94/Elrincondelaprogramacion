<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
        '/register' => [[['_route' => 'register', '_controller' => 'App\\Controller\\UserController::register'], null, ['POST' => 0], null, false, false, null]],
        '/login' => [[['_route' => 'login'], null, ['POST' => 0], null, false, false, null]],
        '/profile-image/upload' => [[['_route' => 'uploadProfileImage', '_controller' => 'App\\Controller\\UserController::uploadProfileImage'], null, ['POST' => 0], null, false, false, null]],
        '/profile-images/{image-name}' => [[['_route' => 'getProfileImage', '_controller' => 'App\\Controller\\UserController::getProfileImage'], null, ['GET' => 0], null, false, false, null]],
        '/users' => [[['_route' => 'getUsers', '_controller' => 'App\\Controller\\UserController::getUsers'], null, ['GET' => 0], null, false, false, null]],
        '/roles' => [[['_route' => 'getRoles', '_controller' => 'App\\Controller\\UserController::getRoles'], null, ['GET' => 0], null, false, false, null]],
        '/logout' => [[['_route' => 'logout', '_controller' => 'App\\Controller\\UserController::logout'], null, ['DELETE' => 0], null, false, false, null]],
        '/category/create' => [[['_route' => 'createCategory', '_controller' => 'App\\Controller\\CategoryController::create'], null, ['POST' => 0], null, false, false, null]],
        '/categories' => [[['_route' => 'getCategories', '_controller' => 'App\\Controller\\HomeController::getCategories'], null, ['GET' => 0], null, false, false, null]],
        '/post/create' => [[['_route' => 'createPost', '_controller' => 'App\\Controller\\PostController::create'], null, ['POST' => 0], null, false, false, null]],
        '/post-image/upload' => [[['_route' => 'uploadImage', '_controller' => 'App\\Controller\\PostController::uploadImage'], null, ['POST' => 0], null, false, false, null]],
        '/posts' => [[['_route' => 'getPosts', '_controller' => 'App\\Controller\\HomeController::getPosts'], null, ['GET' => 0], null, false, false, null]],
        '/posts/most-actives' => [[['_route' => 'getMostActivePosts', '_controller' => 'App\\Controller\\HomeController::getMostActivePosts'], null, ['GET' => 0], null, false, false, null]],
        '/postss/inadequates' => [[['_route' => 'getInadequatePosts', '_controller' => 'App\\Controller\\PostController::getInadequates'], null, ['GET' => 0], null, false, false, null]],
        '/comments/inadequates' => [[['_route' => 'getInadequateComments', '_controller' => 'App\\Controller\\CommentController::getInadequates'], null, ['GET' => 0], null, false, false, null]],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/_error/(\\d+)(?:\\.([^/]++))?(*:35)'
                .'|/users/([^/]++)(?'
                    .'|/(?'
                        .'|update(?'
                            .'|(*:73)'
                            .'|\\-role(*:86)'
                        .')'
                        .'|posts(*:99)'
                        .'|comments(*:114)'
                        .'|ban(*:125)'
                    .')'
                    .'|(*:134)'
                .')'
                .'|/categories/([^/]++)(?'
                    .'|/(?'
                        .'|update(*:176)'
                        .'|delete(*:190)'
                    .')'
                    .'|(*:199)'
                .')'
                .'|/posts(?'
                    .'|/(?'
                        .'|([^/]++)/update(*:236)'
                        .'|categories/([^/]++)(*:263)'
                        .'|([^/]++)(?'
                            .'|(*:282)'
                            .'|/(?'
                                .'|comments(*:302)'
                                .'|delete(*:316)'
                                .'|inadequate(*:334)'
                            .')'
                        .')'
                    .')'
                    .'|\\-images/([^/]++)(*:362)'
                .')'
                .'|/search\\-posts/([^/]++)(*:394)'
                .'|/([^/]++)/comment/create(*:426)'
                .'|/comments/([^/]++)/(?'
                    .'|update(*:462)'
                    .'|inadequate(*:480)'
                    .'|delete(*:494)'
                .')'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        35 => [[['_route' => '_preview_error', '_controller' => 'error_controller::preview', '_format' => 'html'], ['code', '_format'], null, null, false, true, null]],
        73 => [[['_route' => 'updateUser', '_controller' => 'App\\Controller\\UserController::update'], ['id'], ['PUT' => 0], null, false, false, null]],
        86 => [[['_route' => 'updateRole', '_controller' => 'App\\Controller\\UserController::updateRole'], ['id'], ['PUT' => 0], null, false, false, null]],
        99 => [[['_route' => 'getUserPosts', '_controller' => 'App\\Controller\\UserController::getPosts'], ['id'], ['GET' => 0], null, false, false, null]],
        114 => [[['_route' => 'getUserComments', '_controller' => 'App\\Controller\\UserController::getComments'], ['id'], ['GET' => 0], null, false, false, null]],
        125 => [[['_route' => 'banUser', '_controller' => 'App\\Controller\\UserController::ban'], ['id'], ['PUT' => 0], null, false, false, null]],
        134 => [[['_route' => 'getUser', '_controller' => 'App\\Controller\\UserController::getDetails'], ['id'], ['GET' => 0], null, false, true, null]],
        176 => [[['_route' => 'updateCategory', '_controller' => 'App\\Controller\\CategoryController::update'], ['id'], ['PUT' => 0], null, false, false, null]],
        190 => [[['_route' => 'deleteCategory', '_controller' => 'App\\Controller\\CategoryController::delete'], ['id'], ['DELETE' => 0], null, false, false, null]],
        199 => [[['_route' => 'getCategory', '_controller' => 'App\\Controller\\CategoryController::getCategory'], ['name'], ['GET' => 0], null, false, true, null]],
        236 => [[['_route' => 'updatePost', '_controller' => 'App\\Controller\\PostController::update'], ['id'], ['PUT' => 0], null, false, false, null]],
        263 => [[['_route' => 'getPostsByCategory', '_controller' => 'App\\Controller\\HomeController::getPostsByCategory'], ['categoryName'], ['GET' => 0], null, false, true, null]],
        282 => [[['_route' => 'getPostDetails', '_controller' => 'App\\Controller\\PostController::getDetails'], ['title'], ['GET' => 0], null, false, true, null]],
        302 => [[['_route' => 'getPostComments', '_controller' => 'App\\Controller\\PostController::getComments'], ['id'], ['GET' => 0], null, false, false, null]],
        316 => [[['_route' => 'deletePost', '_controller' => 'App\\Controller\\PostController::delete'], ['id'], ['DELETE' => 0], null, false, false, null]],
        334 => [[['_route' => 'indequatePost', '_controller' => 'App\\Controller\\PostController::inadequate'], ['id'], ['PUT' => 0], null, false, false, null]],
        362 => [[['_route' => 'getImage', '_controller' => 'App\\Controller\\PostController::getImage'], ['imageName'], ['GET' => 0], null, false, true, null]],
        394 => [[['_route' => 'getPostsByTitle', '_controller' => 'App\\Controller\\HomeController::getPostsByTitle'], ['title'], ['GET' => 0], null, false, true, null]],
        426 => [[['_route' => 'createComment', '_controller' => 'App\\Controller\\CommentController::create'], ['postId'], ['POST' => 0], null, false, false, null]],
        462 => [[['_route' => 'updateComment', '_controller' => 'App\\Controller\\CommentController::update'], ['id'], ['PUT' => 0], null, false, false, null]],
        480 => [[['_route' => 'indequateComment', '_controller' => 'App\\Controller\\CommentController::inadequate'], ['id'], ['PUT' => 0], null, false, false, null]],
        494 => [
            [['_route' => 'deleteComment', '_controller' => 'App\\Controller\\CommentController::delete'], ['id'], ['DELETE' => 0], null, false, false, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
