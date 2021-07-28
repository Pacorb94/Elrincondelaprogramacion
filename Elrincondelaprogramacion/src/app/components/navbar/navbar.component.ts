import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    userLoggedIn:any;
    //private _userService:UserService
    form:any;
    profileImage:any;
    constructor() {
        //this.form=new FormGroup();
    }

    ngOnInit(): void {

    }

    searchPosts(searchText:string){

    }

    logout(){

    }

    checkTouched(field:any){

    }

    wrongValidationMessage(field:any, fieldName:string){

    }
}
