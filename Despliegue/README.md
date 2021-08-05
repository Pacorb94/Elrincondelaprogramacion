1. En httpd-vhost.conf de Apache crear un host virtual https cuyo DocumentRoot apunte al punto de entrada
del backend y añadirle el certificado SSL (ruta hacia la carpeta "Despliegue/Certificates/Proyecto/Back")

2. Añade un dns en etc/hosts y cambia la url que está en [este](https://github.com/Pacorb94/ProyectoDAW/blob/master/Elrincondelaprogramacion/src/environments/environment.ts) archivo por tu dns

3. Reiniciar Apache

4. En la carpeta "Despliegue/Certificates/Proyecto" hay 2 carpetas por lo que instalar los archivos .crt de cada una de ellas

5. Para no escribir tanto cuando despleguemos el servidor de Angular vamos a angular.json en la clave "configurations" de la clave "serve" añadir la ruta del certificado y la clave, por ej
    ```
    "ssl":true,
    "sslCert":"Despliegue/Certificates/Proyecto/Front/elrincondelaprogramacion.com.crt",
    "sslKey":"Despliegue/Certificates/Proyecto/Front/elrincondelaprogramacion.com.key"
    ```
6. `ng s -o` o `ng serve -o`