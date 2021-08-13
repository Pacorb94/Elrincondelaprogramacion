1. Ponle un certificado SSL al backend

2. Reinicia tu servidor web

2. Cambia la url que está en [este](https://github.com/Pacorb94/ProyectoDAW/blob/master/Elrincondelaprogramacion/src/environments/environment.ts) archivo por tu ruta del backend

3. Ponle un certificado SSL al frontend

4. Para no escribir tanto cuando despleguemos el servidor de Angular vamos a angular.json en la clave "configurations" de la clave "serve" añadir la ruta del certificado del frontend, por ej
    ```
    "ssl":true,
    "sslCert":"ruta del archivo.crt",
    "sslKey":"ruta del archivo.key"
    ```
5. `ng s -o` o `ng serve -o`