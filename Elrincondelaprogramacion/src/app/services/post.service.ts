import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable()
export class PostService {

    constructor(private _http:HttpClient) {
        
    }

    /**
     * Función que obtiene los posts
     * @returns 
     */
    getPosts(page:any):Observable<any>{
        let header=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${environment.url}/posts?page=${page}`, {headers:header});
    }
}
