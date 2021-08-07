1. Crear un host virtual https cuyo DocumentRoot apunte al punto de entrada
del backend, ponle un certificado SSL e instálalo en el navegador

2. Añade un dns en etc/hosts y cambia la url que está en [este](https://github.com/Pacorb94/ProyectoDAW/blob/master/Elrincondelaprogramacion/src/environments/environment.ts) archivo por tu dns

3. Reiniciar Apache

4. Ponle un certificado SSL al frontend e instálalo en el navegador

5. Para no escribir tanto cuando despleguemos el servidor de Angular vamos a angular.json en la clave "configurations" de la clave "serve" añadir la ruta del certificado y la clave, por ej
    ```
    "ssl":true,
    "sslCert":"ruta del archivo .crt",
    "sslKey":"ruta del archivo .key"
    ```
6. `ng s -o` o `ng serve -o`