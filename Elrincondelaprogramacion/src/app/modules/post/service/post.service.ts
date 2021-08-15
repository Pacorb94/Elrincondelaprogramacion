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
     * Función que obtiene un post
     * @param id 
     * @returns 
     */
    getPost(id:any):Observable<any>{
        let header=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${environment.url}/posts/${id}`, {headers:header});
    }

    /**
     * Función que modifica un post
     * @param post 
     * @returns 
     */    
    update(post:any):Observable<any>{
        let data=`json=${JSON.stringify(post)}`;
        console.log(post);
        let header=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.put(`${environment.url}/posts/${post.id}/update`, data, {headers:header});
    }
}
