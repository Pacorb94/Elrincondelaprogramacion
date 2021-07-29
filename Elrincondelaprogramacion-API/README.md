## Descripción
Back-end en forma de API RESTful.

## Requisitos
* Composer 2
* MySQL o MariaDB
* PHP 8 (puedes probar tu versión)

## Pasos a seguir
1. En un sistema gestor de bbdd importar database.sql de la carpeta database
2. `composer install`
3. Generamos una clave para que se firme el token 

    `openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096`

4. Ponemos la clave que hicimos en el paso anterior 
  
    `openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout`

5. En "JWT_PASSPHRASE" del archivo .env ponemos la clave del paso anterior
6. Si tienes XAMPP puedes desplegar en htdocs

