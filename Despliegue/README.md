
1. Añade los siguientes hosts virtuales (puedes editarlos) en el archivo httpd-vhosts.conf

```
<VirtualHost elrincondelaprogramacion.api:80>
    ServerName elrincondelaprogramacion.api
    Redirect / https://elrincondelaprogramacion.api/
</VirtualHost>

<VirtualHost elrincondelaprogramacion.api:443>
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
2. Añade lo siguiente (puedes usar tus dns) en etc/hosts, si lo haces debes cambiar la propiedad url
que está en este [archivo](https://github.com/Pacorb94/ProyectoDAW/blob/master/Elrincondelaprogramacion/src/app/services/User.service.ts)

```
127.0.0.1 elrincondelaprogramacion.com
127.0.0.1 elrincondelaprogramacion.api
```

3. Si estás en Windows agrega el certificado SSL de la siguiente manera:
    
    En la carpeta "certificates" ejecutamos localhost.crt>siguiente>elegimos la segunda opción>examinar>entidades de certificación raíz de confianza>aceptar>siguiente>finalizar>instalamos el certificado
