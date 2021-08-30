import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../models/User';


@Injectable({
    providedIn:'root'
})
export class UserService {
    private user:BehaviorSubject<any>;

    constructor(private _http:HttpClient) {
        this.user=new BehaviorSubject(this.getUserLoggedIn());
    }

    /**
     * Función que registra a un usuario
     * @param user 
     * @returns 
     */
    register(user:User):Observable<any>{
        //Tenemos que convertir el usuario a json-string
        let data=`json=${JSON.stringify(user)}`;
        //Establecemos el tipo de cabecera
        let headers=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(`${environment.url}/register`, data, {headers:headers});
    }

    /**
     * Función que hace el inicio de sesión
     * @param email 
     * @param password 
     * @returns 
     */
    login(email:string, password:string):Observable<any>{
        let data={"email":email, "password":password};
        let headers=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(`${environment.url}/login`, data, {headers:headers});
    }

    /**
     * Función que da valor al BehaviourSubject
     * @param value 
     */
    setUserLoggedIn$(value:any){
        this.user.next(value);
    }

    /**
     * Función que devuelve un observable para comprobar si el usuario inició
     * sesión
     * @returns 
     */
    getUserLoggedIn$():Observable<any>{
        return this.user.asObservable(); 
    }

    /**
     * Función que obtiene el usuario logueado
     * @return
     */
    getUserLoggedIn():any{
        let user=null;
        if (localStorage.hasOwnProperty('user')) user=JSON.parse(localStorage.getItem('user')||'{}');    
        return user;
    }
    
    /**
     * Función que obtiene un usuario
     * @param id 
     * @returns 
     */
    getUser(id:number):Observable<any>{
        return this._http.get(`${environment.url}/users/${id}`);
    }
    
    /**
     * Función que sube una imagen de perfil
     * @param image
     * @return
     */
    uploadProfileImage(image:any):Observable<any>{
        let header=new HttpHeaders().set('Content-Type', 'multipart/form-data');
        return this._http.post(`${environment.url}/profile-image/upload`, image, {headers:header});
    }

    /**
     * Función que obtiene la imagen de perfil
     * @param image
     * @return 
     */
    getProfileImage(image:string):Observable<any>{
        let header=new HttpHeaders().set('Content-Type', 'image/*');
        return this._http.get(`${environment.url}/profile-images/${image}`,
                            {headers:header, responseType:'blob'});
    }

    /**
     * Función que modifica el usuario
     * @param user 
     * @returns 
     */
    update(user:any):Observable<any>{
        //Tenemos que convertir el usuario a json-string
        let data=`json=${JSON.stringify(user)}`;
        //Establecemos el tipo de cabecera
        let header=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.put(`${environment.url}/users/${user.id}/update`, data, {headers:header});
    }

    /**
     * Función que obtiene la contraseña del usuario para refrescar el token
     * @returns 
     */
    getPasswordForRefreshToken():any{
        if (localStorage.hasOwnProperty('password')) return localStorage.getItem('password');
        return null;
    }

    /**
     * Función que obtiene los roles
     * @returns 
     */
    getRoles():Observable<any>{
        return this._http.get(`${environment.url}/roles`);
    }
    
    /**
     * Función que obtiene los comentarios de un usuario
     * @param id 
     * @returns 
     */
    getComments(id:number):Observable<any>{
        return this._http.get(`${environment.url}/users/${id}/comments`);
    }
    
    /**
     * Función que obtiene los usuarios
     * @returns
     */
    getUsers():Observable<any>{
        return this._http.get(`${environment.url}/users`);
    }

    /**
     * Función que cierra sesión
     * @return
     */
    logout():Observable<any>{
        return this._http.delete(`${environment.url}/logout`);
    }
}