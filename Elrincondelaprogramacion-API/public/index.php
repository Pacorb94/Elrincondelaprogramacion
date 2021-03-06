<?php

use App\Kernel;

if ($_SERVER['REQUEST_METHOD']=='OPTIONS') die();
require_once dirname(__DIR__).'/vendor/autoload_runtime.php';

return function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};
?>