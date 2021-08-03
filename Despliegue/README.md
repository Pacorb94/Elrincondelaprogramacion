
1. Añade los siguientes hosts virtuales en el archivo httpd-vhosts.conf

```
<VirtualHost *:80>
    ServerName elrincondelaprogramacion.api
    Redirect / https://elrincondelaprogramacion.api/
</VirtualHost>

<VirtualHost *:443>
    DocumentRoot "C:/xampp/htdocs/Proyecto/Elrincondelaprogramacion-API/public"
    ServerName elrincondelaprogramacion.api
    SSLEngine on
    SSLCertificateFile "conf/ssl.crt/server.crt"
    SSLCertificateKeyFile "conf/ssl.key/server.key"
    <Directory "C:/xampp/htdocs/Proyecto/Elrincondelaprogramacion-API/public">
        Options Indexes FollowSymLinks     
        AllowOverride All
        Order Deny,Allow
        Allow from all     
    </Directory> 
</VirtualHost>
```
2. Añade lo siguiente en etc/hosts 

```
127.0.0.1 elrincondelaprogramacion.com
127.0.0.1 elrincondelaprogramacion.api
```

3. Si estás en Windows agrega el certificado SSL de la siguiente manera:
    
    3.1 win+r escribir mmc, vamos a archivo>agregar o quitar complemento>certificados>agregar>mi cuenta de usuario>finalizar

    3.2 Saldrá nuestros certificados, botón derecho en autoridades de certificación de confianza>todas las tareas>import>siguiente>buscar localhost.crt>siguiente>finalizar>si>ok
