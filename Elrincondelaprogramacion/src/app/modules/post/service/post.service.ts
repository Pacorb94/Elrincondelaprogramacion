import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Post } from '../../../models/Post';


@Injectable({
    providedIn:'root'
})
export class PostService {

    constructor(private _http:HttpClient) {}

    /**
     * Función que crea un post
     * @param post 
     * @returns 
     */
    create(post:Post):Observable<any>{
        let data=`json=${JSON.stringify(post)}`;
        let header=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(`${environment.url}/post/create`, data, {headers:header});
    }

    /**
     * Función que obtiene los posts
     * @returns 
     */
    getPosts(page:any):Observable<any>{
        let header=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${environment.url}/posts?page=${page}`, {headers:header});
    }
    
    /**
     * Función que obtiene los posts de un usuario
     * @param id 
     * @returns 
     */
    getUserPosts(id:number):Observable<any>{
        let header=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${environment.url}/posts/users/${id}`, {headers:header});
    }

    /**
     * Función que borra un post
     * @param id 
     * @returns 
     */
    delete(id:number):Observable<any>{
        return this._http.delete(`${environment.url}/posts/${id}/delete`);
    }
}
