import { Injectable } from '@angular/core';
import { Post } from '../../../models/Post';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


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
     * @param page
     * @returns 
     */
    getPosts(page:any=1):Observable<any>{
        return this._http.get(`${environment.url}/posts?page=${page}`);
    }

    /**
     * Función que obtiene un post
     * @param title
     * @returns 
     */
    getPost(title:string):Observable<any>{
        return this._http.get(`${environment.url}/posts/${title}`);
    }
    
    /**
     * Función que obtiene la imagen del post
     * @param image 
     * @returns 
     */
    getImage(image:string):Observable<any>{
        let header=new HttpHeaders().set('Content-Type', 'image/*');
        return this._http.get(`${environment.url}/posts-images/${image}`,
                            {headers:header, responseType:'blob'});
    }

    /**
     * Función que obtiene los comentarios de un post
     * @param id 
     * @returns 
     */
    getPostComments(page:number, id:number):Observable<any>{
        return this._http.get(`${environment.url}/posts/${id}/comments?page=${page}`);
    }
    
    /**
     * Función que obtiene los posts por categoría
     * @param page 
     * @param categoryName 
     * @returns 
     */
    getPostsByCategory(page:any, categoryName:string):Observable<any>{
        return this._http.get(`${environment.url}/posts/categories/${categoryName}?page=${page}`);
    }
    
    /**
     * Función que obtiene los posts más activos
     * @returns 
     */
    getMostActivePosts():Observable<any>{
        return this._http.get(`${environment.url}/posts/most-actives`);
    }
    
    /**
     * Función que obtiene posts por un texto
     * @param text
     * @param page
     * @returns 
     */
    getPostsByText(text:string, page:number):Observable<any>{
        return this._http.get(`${environment.url}/search-posts/${text}?page=${page}`);
    }

    /**
     * Función que modifica un post
     * @param post 
     * @returns 
     */    
    update(post:any):Observable<any>{
        let data=`json=${JSON.stringify(post)}`;
        let header=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.put(`${environment.url}/posts/${post.id}/update`, data, {headers:header});
    }

    /**
     * Función que marca como inadecuado un post
     * @param id 
     * @returns 
     */
    inadequate(id:number):Observable<any>{
        let header=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.put(`${environment.url}/posts/${id}/inadequate`, {headers:header});
    }

    /**
     * Función que obtiene los posts inadecuados
     * @returns 
     */
    getInadequates():Observable<any>{
        return this._http.get(`${environment.url}/postss/inadequates`);
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
