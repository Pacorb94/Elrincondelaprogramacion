import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from 'src/app/module/user/service/user.service';

@Injectable({
    providedIn: 'root'
})
export class CheckNoReaderRoleGuard implements CanActivate {
    private user:any;

    constructor(private _userService:UserService, private _router:Router){
        this.user=this._userService.getUserLoggedIn();
    }

    /**
     * Función que comprueba si el usuario no es el usuario lector
     * @returns 
     */
    canActivate() {
        if (this.user.roles[0]!='ROLE_READER') return true;   
        this._router.navigate(['']);
        return false;
    }
}
