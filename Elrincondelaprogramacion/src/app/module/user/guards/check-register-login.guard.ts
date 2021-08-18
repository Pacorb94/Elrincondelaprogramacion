import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';


@Injectable()
export class CheckRegisterLoginGuard implements CanActivate {
    private user:any;

    constructor(private _userService:UserService, private _router:Router){
        this.user=this._userService.getUserLoggedIn();
    } 
    
    /**
     * Función que restringe al usuario logueado ir al registro y login
     * @returns 
     */
    canActivate() {
        if (this.user) {
            this._router.navigate(['']);
            return false;
        }
        return true;
    }
}
