import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable()
export class UserService {
    private url:string;
    private user:BehaviorSubject<any>;

    constructor(private _http:HttpClient) {
        this.url='https://elrincondelaprogramacion.api';
        this.user=new BehaviorSubject(this.getUserLoggedIn());
    }

    /**
     * Función que da valor al usuario
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
     * Función que registra a un usuario
     * @param user 
     * @returns 
     */
    register(user:User):Observable<any>{
        //Tenemos que convertir el usuario a json-string
        let data=`json=${JSON.stringify(user)}`;
        //Establecemos el tipo de cabecera
        let headers=new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(`${this.url}/register`, data, {headers:headers});
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
        return this._http.post(`${this.url}/login`, data, {headers:headers, withCredentials:true});
    }

    /**
     * Función que obtiene el usuario logueado
     * @return
     */
    getUserLoggedIn():any{
        let user=null;
        if (localStorage.hasOwnProperty('user')) {
            user=JSON.parse(localStorage.getItem('user')||'{}');
        }
        return user;
    }

    /**
     * Función que obtiene la imagen de perfil
     * @param image 
     * @return 
     */
    getProfileImage(image:string):Observable<any>{
        let header=new HttpHeaders().set('Content-Type', 'image/*');
        return this._http.get(`${this.url}/profile-image/${image}`, {headers:header, responseType:'blob'});
    }

    /**
     * Función que cierra sesión
     * @return
     */
    logout():Observable<any>{
        return this._http.delete(`${this.url}/logout`);
    }
}
