## Objetivo
Consolidar los conocimientos del Grado Superior DAW y aportar mis conomientos propios
al proyecto.

## Descripción
Es un blog de noticias referentes al sector de la programación.

Puedes ver los diagramas [aquí](https://github.com/Pacorb94/ProyectoDAW/blob/master/Diagramas/).

## Requisitos para desarrollo
* Apache
* SQL
* PHP 8 (puedes probar tu versión)
* Composer 2
* Angular 12 (puedes probar tu versión a partir de la 9)

## Pasos a seguir
 1. En un sistema gestor de bbdd importar database.sql de la carpeta database
 2. `composer install`
 3. Generamos una clave para que se firme el token 

        `openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096`

 4. Ponemos la clave que hicimos en el paso anterior 
    
        `openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout`

 5. En "JWT_PASSPHRASE" del archivo .env ponemos la clave del paso anterior
 6. `npm i` o `npm install`
 7. Sigue [estos](https://github.com/Pacorb94/ProyectoDAW/tree/master/Despliegue) pasos para el despliegue

## Licencia
MIT