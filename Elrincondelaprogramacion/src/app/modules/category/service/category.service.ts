import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

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
        return this._http.get(`${environment.url}/categories`);
    }
}
