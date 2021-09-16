#Redirección HTTP a HTTPS
server {
       listen 80;
       server_name elrincondelaprogramacion.com:8080;
       return 301 https://elrincondelaprogramacion.com:8081;
}

server {
        listen 443 ssl;
	ssl_certificate /etc/ssl/certs/localhost.crt;
        ssl_certificate_key /etc/ssl/certs/localhost.key;        
	root /var/www/Proyecto;
        #Dominio que apunta a una dirección ip de /etc/hosts
        server_name elrincondelaprogramacion.com:8081;
        #La ruta inicial cargará index.html 
	location / {
            try_files $uri $uri/ /index.html;
        }
        error_log /var/log/nginx/angular_error.log;
        access_log /var/log/nginx/angular_access.log;
}
