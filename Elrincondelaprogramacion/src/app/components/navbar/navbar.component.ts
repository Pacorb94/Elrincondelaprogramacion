import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../module/user/service/user.service';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
    user:any;
    form:any;
    profileImage:any;
    categories:any[];
    loadUserSubscription:Subscription;
    loadProfileImageSubscription:Subscription;
    categoriesSubscription:Subscription;
    logoutSubscription:Subscription;

    constructor(private _userService:UserService, private _categoryService:CategoryService, 
    private _router:Router, private _sanitizer:DomSanitizer) {
        this.form=new FormGroup({
            postsSearchText:new FormControl('', Validators.required)
        });
        this.categories=[];
        this.loadUserSubscription=new Subscription();
        this.loadProfileImageSubscription=new Subscription();
        this.categoriesSubscription=new Subscription();
        this.logoutSubscription=new Subscription();
    }

    ngOnInit(){
        this.loadUser();
        this.getCategories();
    }

    ngOnDestroy(){
        this.loadUserSubscription.unsubscribe();
        this.loadProfileImageSubscription.unsubscribe();
        this.categoriesSubscription.unsubscribe();
        this.logoutSubscription.unsubscribe();
    }

    /**
     * Función que carga el usuario
     */
    loadUser(){
        this.loadUserSubscription=this._userService.getUserLoggedIn$().subscribe(
            user=>{
                if (user) {
                    this.user=user;
                    this.loadProfileImage();
                }
            }
        );
    }

    /**
     * Función que carga la imagen de perfil del usuario, si no tiene o hay un error se asigna una por
     * defecto
     */
    loadProfileImage(){
        if (this.user.profileImage) {           
            this.loadProfileImageSubscription=this._userService.getProfileImage(this.user.profileImage)
                .subscribe(
                    response=>{
                        let imageURL=URL.createObjectURL(response);
                        this.profileImage=this._sanitizer.bypassSecurityTrustUrl(imageURL);
                    },
                    error=>{
                        this.profileImage='../assets/images/no-profile-image.png';
                    }
                );
        }else{
            this.profileImage='../assets/images/no-profile-image.png';
        }
    }

    /**
     * Función que obtiene las categorías
     */
    getCategories(){
        this.categoriesSubscription=this._categoryService.getCategories().subscribe(
            response=>{
                if (response) this.categories=response;            
            },
            error=>{}
        );
    }

    /**
     * Función que busca temas por una palabra
     * @param text 
     */
    searchPosts(text:string){
        return this._router.navigate([]);
    }

    /**
     * Función que cierra sesión
     */
    logout(){
        this.logoutSubscription=this._userService.logout().subscribe(
            response=>{
                this.user=null;
                localStorage.removeItem('user');
                localStorage.removeItem('password');
                //Le damos null al BehaviourSubject
                this._userService.setUserLoggedIn$(this.user);
                this._router.navigate(['']);
            },
            error=>{}
        );
    }
}
