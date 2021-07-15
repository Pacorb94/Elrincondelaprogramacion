## Descripción
Back-end en forma de API RESTful en el cual trata sobre un blog de noticias referentes 
al sector de la programación.

Tiene 3 tipos de usuarios: 
1. Usuario lector: puede leer posts, comentar en los posts y buscar posts.
2. Usuario redactor: puede hacer todo lo anterior más publicar posts y crear categorías.
3. Usuario admin: puede hacer lo mismo que el usuario lector más revisar comentarios y posts por
si son ofensivos borrarlos o banear al que lo hizo.

## Requisitos
* Composer 2
* MySQL o MariaDB
* PHP 8 (puedes probar tu versión)

## Pasos a seguir
1. En un sistema gestor de bbdd importar database.sql de la carpeta database
2. `composer install`
3. Si tienes XAMPP puedes desplegar en htdocs

