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
     * Función que modifica una categoría
     * @param category 
     * @returns 
     */
    update(category:any):Observable<any>{
        let data=`json=${JSON.stringify(category)}`;
        let header=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.put(`${environment.url}/categories/${category.name}/update`, data, 
                            {headers:header});
    }

    /**
     * Función que obtiene una categoría
     * @param name
     * @returns 
     */
    getCategory(name:string):Observable<any>{
        return this._http.get(`${environment.url}/categories/${name}`);
    }

    /**
     * Función que obtiene las categorías
     * @returns 
     */
    getCategories():Observable<any>{
        return this._http.get(`${environment.url}/categories`);
    }

    /**
     * Función que borra una categoría
     * @param name
     * @returns 
     */
    delete(name:string):Observable<any>{
        return this._http.delete(`${environment.url}/categories/${name}/delete`);
    }
}
