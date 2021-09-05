import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../modules/user/service/user.service';
import { CategoryService } from '../../modules/category/service/category.service';
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
    categories:any[];

    constructor(private _userService:UserService, private _categoryService:CategoryService, 
    private _router:Router, private _sanitizer:DomSanitizer) {
        this.form=new FormGroup({
            postsSearchText:new FormControl('')
        });
        this.categories=[];
    }

    ngOnInit(){
        this.loadUser();
        this.updateNavbarCategoryList();
    }

    /**
     * Función que carga el usuario
     */
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

    /**
     * Función que carga la imagen de perfil del usuario, si no tiene o hay un error se asigna una por
     * defecto
     */
    loadProfileImage(){
        if (this.user.profileImage) {           
            this._userService.getProfileImage(this.user.profileImage).subscribe(
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
     * Función que actualiza la lista de categoría si se crea, modificar o borra
     * una categoría
     */
    updateNavbarCategoryList(){
        this._categoryService.getUpdateNavbarCategoryList$().subscribe(
            update=>{
                this.getCategories();
            }
        );
    }

    /**
     * Función que obtiene las categorías
     */
    getCategories(){
        this._categoryService.getCategories().subscribe(
            response=>{
                if (response) this.categories=response;            
            },
            error=>{}
        );
    }

    /**
     * Función que busca posts por un texto
     * @param text 
     */
    searchPosts(text:string){
        return this._router.navigate(['search-posts', text]);
    }

    /**
     * Función que cierra sesión
     */
    logout(){
        this._userService.logout().subscribe(
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
