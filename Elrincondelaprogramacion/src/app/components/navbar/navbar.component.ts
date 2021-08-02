import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    user:any;
    form:any;
    profileImage:any;
    
    constructor(private _userService:UserService, private _router:Router, 
    private _sanitizer:DomSanitizer) {
        this.form=new FormGroup({
            postsSearchText:new FormControl('', Validators.required)
        });
    }

    ngOnInit(): void {
        this.loadUser();
    }

    loadUser(){
        this._userService.getUserLoggedIn$().subscribe(
            user=>{
                if (user) {
                    this.user=user;
                    this.loadProfileImage();
                }
            }
        );
    }

    loadProfileImage(){

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
