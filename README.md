## Descripción
Es un blog de noticias referentes al sector de la programación.

## Despliegue en producción:

 0. Si no tienes Docker Compose instálalo.
 1. Ve a la carpeta Docker y crea los contenedores `sudo docker-compose up -d --build`
 2. Ejecuta las migraciones `sudo docker-compose exec php php bin/console doctrine:migrations:migrate` y pulsa la tecla Y.
 3. En el navegador permite el contenido inseguro de `https://localhost:8081` 
    y `https://localhost:9081`. Puede que tengas que actualizar la ventana del frontend.
 4. Opcionalmente puedes iniciar sesión con esta cuenta con rol de admin, email admin@erp.com y la contraseña 1.

## Licencia
MIT