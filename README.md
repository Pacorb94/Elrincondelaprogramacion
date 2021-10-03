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

 0. Si no tienes Docker con Docker Compose instálalo.
 1. Ve a la carpeta Docker y crea los contenedores `sudo docker-compose up -d --build`
 2. Ve al contenedor de mysql `sudo docker-compose exec mysql mysql -uroot -p1`
        
    1. Copia, pega y ejecuta App/Elrincondelaprogramacion-API/database/database.sql en la consola de MySQL.

 3. En el navegador permite el contenido inseguro de `https://localhost:8081` 
    y `https://localhost:9081`. Puede que tengas que actualizar el frontend.
 4. Puedes iniciar sesión con la cuenta con rol de admin (ver bbdd) o crearte otra (sin rol admin).

## Licencia
MIT