## Objetivo
Consolidar los conocimientos del Grado Superior DAW y aportar mis conomientos propios
al proyecto.

## Descripción
Es un blog de noticias referentes al sector de la programación.

Puedes ver los diagramas [aquí](https://github.com/Pacorb94/ProyectoDAW/blob/master/Diagramas/).

## Tecnologías usadas:
* Nginx 
* MySQL
* PHP 8 (puedes probar tu versión)
* Composer 2
* Angular 12 (puedes probar tu versión a partir de la 9)

## Despliegue:
* Si usas Docker Compose:
 1. En la carpeta Docker crea los contenedores `docker-compose up -d --build`
 2. Ve al contenedor de mysql `docker-compose exec mysql mysql -uroot -p1`
      
    1. Copia, pega y ejecuta App/Elrincondelaprogramacion-API/database/database.sql en la consola de mysql

 3. En el navegador permite el contenido inseguro de `https://elrincondelaprogramacion:8081` 
 y `https://api.elrincondelaprogramacion:9081`

* Si no usas Docker:
 1. Importa o pega App/Elrincondelaprogramacion-API/database/database.sql en un gestor de bbdd.
 2. Instala las dependencias `npm i` `composer install`.  
 3. En App/Elrincondelaprogramacion-API/config/jwt genera una clave para que se firme el token.

        openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096

    1. Pon la clave que pusistes en el paso anterior.

       `openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout`

    2. En "JWT_PASSPHRASE" del archivo .env pon la clave del paso anterior.
 4. Pasa el frontend a producción `ng b`.
 5. Crea un host virtual para el backend y para el frontend (la carpeta root será App/Elrincondelaprogramacion/dist/Elrincondelaprogramacion) en tu servidor web, pon un certificado SSL a los 2 host virtuales.

    1. En /etc/hosts pon lo siguiente
         127.0.0.1       elrincondelaprogramacion.com
         127.0.0.1       api.elrincondelaprogramacion.com

    2. Reinicia tu servidor web.

 6. En el navegador permite el contenido inseguro de `https://elrincondelaprogramacion` y 
 `https://api.elrincondelaprogramacion`.

## Licencia
MIT
