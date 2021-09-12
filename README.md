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
 1. Crear los contenedores `docker-compose up -d --build`
 2. En App/Elrincondelaprogramacion-API/config/jwt generamos una clave para que se firme el token 

        openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096

 3. Ponemos la clave que hicimos en el paso anterior 
    
        openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout

 4. En "JWT_PASSPHRASE" del archivo .env ponemos la clave del paso anterior
 5. Reiniciar contenedor del frontend o recargar el navegador

* Si no usas Docker:
 1. Importar ELrincondelaprogramacion-API/database/database.sql a un gestor de bbbdd
 2. Instalar dependencias `npm i` `composer install`
 3. Hacemos los pasos 2-4 de arriba
 4. Crear host virtual para el backend en tu servidor web y en /etc/hosts poner un dominio para el frontend y el backend que apunten a 127.0.0.1. Si el dominio del frontend de /etc/hosts es diferente a https://elrincondelaprogramacion.com debes cambiar la propiedad url de los archivos de [esta](https://github.com/Pacorb94/ProyectoDAW/blob/master/App/Elrincondelaprogramacion/src/environments/) carpeta
 
    1. Poner certificados SSL al frontend (en angular.json) y al backend (en el host virtual) 
 5. Pasar el frontend a producción  `ng b`
 6. Pasar el backend a producción en el archivo .env cambiar APP_ENV a prod

## Licencia
MIT