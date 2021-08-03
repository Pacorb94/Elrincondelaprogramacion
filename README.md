## Objetivo
Consolidar los conocimientos del Grado Superior DAW y aportar mis conomientos propios
al proyecto

## Descripción
Es un blog de noticias referentes al sector de la programación.

Puedes ver el modelo relacional [aquí](https://github.com/Pacorb94/ProyectoDAW/blob/master/Diagramas/Modelo%20relacional.png)

Puedes ver el diagrama de clases [aquí](https://github.com/Pacorb94/ProyectoDAW/blob/master/Diagramas/Diagrama%20de%20clases.png)

Puedes ver lo que puede hacer cada tipo de usuario [aquí](https://github.com/Pacorb94/ProyectoDAW/blob/master/Diagramas/Casos%20de%20uso.png)

Este proyecto el front-end y el back-end están separados, por lo que [aquí](https://github.com/Pacorb94/ProyectoDAW/tree/master/Elrincondelaprogramacion) accedes 
al front-end y [aquí](https://github.com/Pacorb94/ProyectoDAW/tree/master/Elrincondelaprogramacion-API) al back-end

## Requisitos
* Composer 2
* Apache
* MySQL o MariaDB
* PHP 8 (puedes probar tu versión)
* Node.js
* Angular 12 (puedes probar tu versión)

## Pasos a seguir
0. Sigue [estos](https://github.com/Pacorb94/ProyectoDAW/tree/master/Despliegue) pasos para el despliegue

#### Dentro de la carpeta "Elrincondelaprogramacion-API"
1. En un sistema gestor de bbdd importar database.sql de la carpeta database
2. `composer install`
3. Generamos una clave para que se firme el token 

    `openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096`

4. Ponemos la clave que hicimos en el paso anterior 
  
    `openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout`

5. En "JWT_PASSPHRASE" del archivo .env ponemos la clave del paso anterior

#### Dentro de la carpeta "Elrincondelaprogramacion"
7. `npm i` o `npm install`
8. `ng s -o` o `ng server -o`

## Licencia
No MIT