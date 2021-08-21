import { Injectable } from '@angular/core';
import { Commentt } from '../../../models/Commentt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn:'root'
})
export class CommentService {
    
    constructor(private _http:HttpClient) {}

    /**
     * Función que crea un comentario
     * @param postTitle 
     * @param comment 
     * @returns 
     */
    create(postTitle:string, comment:Commentt):Observable<any>{
        let data=`json=${comment}`;
        let header=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(`${environment.url}/${postTitle}/comment/create`, data, {headers:header});
    }
    
    /**
     * Función que modifica un comentario
     * @param comment 
     * @returns 
     */
    update(comment:any):Observable<any>{
        let data=`json=${comment}`;
        let header=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.put(`${environment.url}/comments/${comment.id}/update`, data, {headers:header});
    }
    
    /**
     * Función que marca como inadecuado un comentario
     * @param id 
     * @param inadequate 
     * @returns 
     */
    inadequate(id:number, inadequate:string):Observable<any>{
        let data=`json=${inadequate}`;
        let header=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.put(`${environment.url}/comments/${id}/inadequate`, data, {headers:header});
    }
    
    /**
     * Función que borra un comentario
     * @param id 
     * @returns 
     */
    delete(id:number):Observable<any>{
        return this._http.delete(`${environment.url}/comments/${id}/delete`);
    }
}
