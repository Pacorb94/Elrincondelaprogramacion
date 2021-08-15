import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class CategoryService {

    constructor(private _http:HttpClient) {}

    /**
     * Función que obtiene las categorías
     * @returns 
     */
    getCategories():Observable<any>{
        let header=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${environment.url}/categories`, {headers:header});
    }

    /**
     * Función que crea un categoría
     * @param category 
     * @returns 
     */
    create(category:any):Observable<any>{
        let data=`json=${JSON.stringify(category)}`;
        let header=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(`${environment.url}/category/create`, data, {headers:header});
    }

    /**
     * Función que borra una categoría
     * @param id 
     * @returns 
     */
    delete(id:number):Observable<any>{
        return this._http.delete(`${environment.url}/categories/${id}/delete`);
    }
}
