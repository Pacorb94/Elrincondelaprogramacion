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
* Angular 12 (puedes probar tu versión a partir de la 9)

## Despliegue:
* ### Si usas Docker:
 1. Crea los contenedores `docker-compose up -d --build`
 2. Ve al contenedor de mysql `docker-compose exec mysql mysql -uroot -p1`
        
    1. Copia, pega y ejecuta App/Elrincondelaprogramacion-API/database/database.sql en la consola de mysql

 3. En el navegador permite el contenido inseguro de `https://elrincondelaprogramacion:8081` 
    y `https://api.elrincondelaprogramacion:9081`

* ### Si no usas Docker:
 0. Instala un servidor web, MySQL, PHP 8 y Angular (a partir de la versión 9).
 1. Importa o pega App/Elrincondelaprogramacion-API/database/database.sql en un gestor de bbdd.
 2. Instala las dependencias `npm i` `composer install`
 3. Crea un host virtual para el backend y para el frontend (la carpeta root será App/Elrincondelaprogramacion/dist/Elrincondelaprogramacion) en tu servidor web, pon un certificado SSL a los 2 host virtuales

    1. En /etc/hosts de tu sistema operativo pon el dominio del frontend y backend que apunten a 127.0.0.1.

    2. Reinicia tu servidor web.

 4. En App/Elrincondelaprogramacion/src/environment.prod.ts cambia la url por el dominio del backend.

    1. En App/Elrincondelaprogramacion pasa a producción `ng b`

 5. En el navegador permite el contenido inseguro de `https://elrincondelaprogramacion` y 
 `https://api.elrincondelaprogramacion`

## Licencia
MIT
