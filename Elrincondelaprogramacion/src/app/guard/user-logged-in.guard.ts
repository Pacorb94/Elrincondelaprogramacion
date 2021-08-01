import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';

@Injectable()
export class UserLoggedInGuard implements CanActivate {
    private userLoggedIn:any;

    constructor(){

    }

    canActivate(){
        return false;
    }
}
