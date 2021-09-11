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

## Despliegue en producción:
* Si usas Docker:
 1.     docker compose up --build
 2. En App/Elrincondelaprogramacion-API/config crear una carpeta "jwt", generamos una clave para que se firme el token 

        openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096

 3. Ponemos la clave que hicimos en el paso anterior 
    
        openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout

 4. En "JWT_PASSPHRASE" del archivo .env ponemos la clave del paso anterior

* Si no usas Docker:
 1. Hacemos los pasos 2-4 de arriba
 2. Crear host virtual para el backend en tu servidor web y en /etc/hosts poner un dominio para el frontend y el backend que apunten a 127.0.0.1
 3. Poner certificados SSL al frontend (en angular.json) y al backend (en el host virtual)
 4. En el navegador `https://tudominio`

## Licencia
MIT