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
                    this.profileImage='../assets/images/no-profile-image/sinFotoPerfil.png';
                }
            );
        }else{
            this.profileImage='../assets/images/no-profile-image/sinFotoPerfil.png';
        }
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
        this._userService.logout().subscribe(
            response=>{
                this.user=null;
                localStorage.removeItem('user');
                //Le damos null al BehaviourSubject
                this._userService.setUserLoggedIn$(this.user);
            },
            error=>{}
        );
    }

    /**
     * Función que comprueba si el foco está en el campo
     * @param field
     */
    checkTouched(field:any):boolean{
        if (field.touched) return true;
        return false;
    }

    /**
     * Función que muestra un mensaje de validación incorrecta
     * @param field 
     * @param fieldName 
     */
    wrongValidationMessage(field:any, fieldName:string):string{
        if (field.errors?.required) return `El campo ${fieldName} es obligatorio`;
        return '';
    }
}
