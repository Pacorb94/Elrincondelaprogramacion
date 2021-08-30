import { Injectable } from '@angular/core';
import { Commentt } from '../../../models/Commentt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
    providedIn:'root'
})
export class CommentService {
    private updatedCommentList:BehaviorSubject<boolean>;

    constructor(private _http:HttpClient) {
        this.updatedCommentList=new BehaviorSubject<boolean>(false);
    }

    /**
     * Función que actualiza el valor del BehaviourSubject
     * @param value 
     */
    setUpdatedCommentList$(value:boolean){
        this.updatedCommentList.next(value);
    }

    /**
     * Función que devuelve el observable
     * @returns 
     */
    getUpdatedCommentList$():Observable<boolean>{
        return this.updatedCommentList.asObservable();
    }

    /**
     * Función que crea un comentario
     * @param postId
     * @param comment 
     * @returns 
     */
    create(postId:number, comment:Commentt):Observable<any>{
        let data=`json=${JSON.stringify(comment)}`;
        let header=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(`${environment.url}/${postId}/comment/create`, data, {headers:header});
    }
    
    /**
     * Función que modifica un comentario
     * @param comment 
     * @returns 
     */
    update(comment:any):Observable<any>{
        let data=`json=${JSON.stringify(comment)}`;
        let header=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.put(`${environment.url}/comments/${comment.id}/update`, data, {headers:header});
    }
    
    /**
     * Función que marca como inadecuado un comentario
     * @param id
     * @returns 
     */
    inadequate(id:number):Observable<any>{
        let header=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.put(`${environment.url}/comments/${id}/inadequate`, {headers:header});
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
