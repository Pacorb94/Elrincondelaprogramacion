## Objetivo
Consolidar los conocimientos del Grado Superior DAW y aportar mis conomientos propios
al proyecto.

## Descripción
Es un blog de noticias referentes al sector de la programación.

Puedes ver los diagramas [aquí](https://github.com/Pacorb94/ProyectoDAW/blob/master/Diagramas/).

## Tecnologías usadas:
* Nginx 1.18
* MySQL 8
* Symfony 5.3
* Angular 12

## Despliegue:
Puedes iniciar sesión con la cuenta con rol de admin (ver bbdd) o crearte otra (sin rol admin).
* ### Si usas Docker:
 1. Ve a la carpeta Docker y crea los contenedores `sudo docker-compose up -d --build`
 2. Ve al contenedor de mysql `sudo docker-compose exec mysql mysql -uroot -p1`
        
    1. Copia, pega y ejecuta App/Elrincondelaprogramacion-API/database/database.sql en la consola de mysql

 3. En el navegador permite el contenido inseguro de `https://elrincondelaprogramacion:8081` 
    y `https://api.elrincondelaprogramacion:9081`. Puede que tengas que actualizar el frontend.

* ### Si no usas Docker:
 0. Instala un servidor web, MySQL, PHP 8 y Angular (a partir de la versión 9).
 1. Importa App/Elrincondelaprogramacion-API/database/database.sql en un gestor de bbdd o pégalo en la consola de MySQL.
 2. Instala las dependencias `npm i` `composer install`
 3. Crea un host virtual para el backend y para el frontend (la carpeta root será App/Elrincondelaprogramacion/dist/Elrincondelaprogramacion) en tu servidor web, pon un certificado SSL a los 2 host virtuales

    1. En /etc/hosts de tu sistema operativo pon el dominio del frontend y backend que apunten a 127.0.0.1.

    2. Reinicia tu servidor web.

 4. En App/Elrincondelaprogramacion/src/environment.prod.ts quita el puerto de la url.

    1. Pasa a producción `ng b`

 5. En el navegador permite el contenido inseguro de `https://elrincondelaprogramacion` y 
 `https://api.elrincondelaprogramacion`. Puede que tengas que actualizar el frontend.

## Licencia
MIT
