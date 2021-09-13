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
* ### Si usas Docker Compose:
 1. En la carpeta Docker crea los contenedores `docker-compose up -d --build`
 2. Ve al contenedor de mysql `docker-compose exec mysql mysql -uroot -p1`
        
    1. Copia, pega y ejecuta App/Elrincondelaprogramacion-API/database/database.sql en la consola de mysql

 3. En el navegador permite el contenido inseguro de `https://elrincondelaprogramacion:8081` 
    y `https://api.elrincondelaprogramacion:9081`

* ### Si no usas Docker:
 1. Importa o pega App/Elrincondelaprogramacion-API/database/database.sql en un gestor de bbdd.
 2. Instala las dependencias `npm i` `composer install`
 3. En App/Elrincondelaprogramacion-API/config/jwt

    1. Genera una clave para que se firme el token
    
        ```    
        openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
        ```

    2. Pon la clave que pusistes en el paso anterior

       ```
       openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout
       ```

    3. En "JWT_PASSPHRASE" del archivo .env pon la clave del paso anterior. 
 4. Crea un host virtual para el backend y para el frontend (la carpeta root será App/Elrincondelaprogramacion/dist/Elrincondelaprogramacion) en tu servidor web, pon un certificado SSL a los 2 host virtuales

    1. En /etc/hosts de tu sistema operativo pon el dominio del frontend y backend que apunten a 127.0.0.1.

    2. Reinicia tu servidor web.

 5. En App/Elrincondelaprogramacion/src/environment.prod.ts cambia la url por el dominio del backend.

    1. En App/Elrincondelaprogramacion pasa a producción `ng b`

 6. En el navegador permite el contenido inseguro de `https://elrincondelaprogramacion` y 
 `https://api.elrincondelaprogramacion`

## Contribución
Si quieres contribuir en App/Elrincondelaprogramacion/src/environments/environment.ts cambia la propiedad url por tu dominio (host virtual) o ip de la API que tu quieras y pon certificado SSL en angular.json o si quieres hacer un host virtual pues ahí.

## Licencia
MIT
