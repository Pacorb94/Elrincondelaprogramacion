import { Component } from '@angular/core';
import { UserService } from '../../../../service/user.service';

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {
    pageTitle:string;
    user:any;

    constructor(private _userService:UserService) {
        this.pageTitle='Panel del usuario';
        this.user=this._userService.getUserLoggedIn();
    }
}
