import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    /**
     * Función que agrega a cada petición withCredentials automáticamente
     * @param req 
     * @param next 
     * @returns 
     */
    intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
        req=req.clone({
            withCredentials: true
        });
        return next.handle(req);
    }
}