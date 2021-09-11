import { Component } from '@angular/core';
import { UserService } from '../../../../service/user.service';

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {
    user:any;

    constructor(private _userService:UserService) {
        this.user=this._userService.getUserLoggedIn();
    }
}
