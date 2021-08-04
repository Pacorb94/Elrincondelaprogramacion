import { Injectable } from '@angular/core';
import { UserService } from '../service/user.service';
import { CanActivate, Router} from '@angular/router';

@Injectable()
export class UserLoggedInGuard implements CanActivate {
    private user:any;

    constructor(private _userService:UserService, private _router:Router){
        this.user=this._userService.getUserLoggedIn();
    }

    /**
     * Función que comprueba si el usuario está logueado
     * @returns 
     */
    canActivate(){
        if(this.user) return true;   
        this._router.navigate(['/home']);
        return false;
    }
}
