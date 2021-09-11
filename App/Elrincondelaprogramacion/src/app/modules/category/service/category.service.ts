import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class CategoryService {
    private lastAddedCategory:BehaviorSubject<any>;
    private updateNavbarCategoryList:BehaviorSubject<any>;

    constructor(private _http:HttpClient) {
        this.lastAddedCategory=new BehaviorSubject('');
        this.updateNavbarCategoryList=new BehaviorSubject<boolean>(false);
    }

    /**
     * Función que le dice al BehaviorSubject cuando se creó
     * una categoría
     * @param category
     */
    setLastAddedCategory$(category:any){
        this.lastAddedCategory.next(category);
    }

    /**
     * Función que obtiene la categoría creada del BehaviorSubject
     * @returns 
     */
    getLastAddedCategory$():Observable<any>{
        return this.lastAddedCategory.asObservable();
    }

    /**
     * Función que actualiza la lista de categorías del navbar cuando se
     * crea, modifica o borra una categoría
     * @param value 
     */
    setUpdateNavbarCategoryList$(value:boolean){
        this.updateNavbarCategoryList.next(value);
    }

    /**
     * Función que obtiene el valor del BehaviorSubject
     * @returns 
     */
    getUpdateNavbarCategoryList$():Observable<boolean>{
        return this.updateNavbarCategoryList.asObservable();
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
     * Función que modifica una categoría
     * @param category 
     * @returns 
     */
    update(category:any):Observable<any>{
        let data=`json=${JSON.stringify(category)}`;
        let header=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.put(`${environment.url}/categories/${category.id}/update`, data, 
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
     * @param $id
     * @returns 
     */
    delete(id:number):Observable<any>{
        return this._http.delete(`${environment.url}/categories/${id}/delete`);
    }
}
