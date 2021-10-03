#Redirección HTTP a HTTPS
server {
       listen 80;
       server_name localhost:9080;
       return 301 https://localhost:9081;
}

server {
        listen 443 ssl;
	    ssl_certificate /etc/ssl/certs/localhost.crt;
        ssl_certificate_key /etc/ssl/certs/localhost.key;        
	    root /var/www/Proyecto/public;
        add_header 'Access-Control-Allow-Origin' 'https://localhost:8081' always;
        add_header 'Access-Control-Allow-Credentials' 'true' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, DELETE, PUT, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization, authorization' always;
        if ($request_method = OPTIONS ) {
             return 200;
        }
        server_name localhost:9081;
        #La ruta inicial cargará index.php 
	    location / {
            try_files $uri /index.php?$args;
        } 
        #Cuando el archivo sea index.php cargará el intérprete de PHP
        location ~ ^/index\.php(/|$) {
            #Proxy que es un contenedor
            fastcgi_pass php:9000;
            fastcgi_split_path_info ^(.+\.php)(/.*)$;
            #El buffer es sólo si el frontend sube archivos al servidor
            fastcgi_buffer_size 128k;
            fastcgi_buffers 4 256k;
            fastcgi_busy_buffers_size 256k;
            include fastcgi_params;
            fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
            fastcgi_param DOCUMENT_ROOT $realpath_root;
            internal;
        }
        #Lo que no coincida devolverá un 404
        location ~ \.php$ {
            return 404;
        }
        error_log /var/log/nginx/symfony_error.log;
        access_log /var/log/nginx/symfony_access.log;
}