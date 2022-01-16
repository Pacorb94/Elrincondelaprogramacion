import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Injectable({
    providedIn: 'root'
})
export class CheckAdminRoleGuard implements CanActivate {
    private user:any;

    constructor(private _userService:UserService, private _router:Router){
        this.user=this._userService.getUserLoggedIn();
    }

    /**
     * Función que comprueba si el usuario es el admin
     * @returns 
     */
    canActivate() {
        if (this.user.roles[0]=='ROLE_ADMIN') return true;   
        this._router.navigate(['']);
        return false;
    }
}