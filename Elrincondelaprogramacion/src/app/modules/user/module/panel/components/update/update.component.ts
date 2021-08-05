import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../../../service/user.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { environment } from './../../../../../../../environments/environment';

@Component({
    selector: 'update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
    pageTitle:string;
    user:any;
    form:FormGroup;
    afuConfig:any;

    constructor(private _userService:UserService, private _router:Router,
    private _flashMessagesService:FlashMessagesService) { 
        this.pageTitle='Ajustes del usuario';
        this.user=this._userService.getUserLoggedIn();
        this.form=new FormGroup({
            nick:new FormControl(this.user.nick),
            email:new FormControl(this.user.email, Validators.email)
        });
        this.afuConfig={
            //Sólo 1 archivo
            multiple:false,
            formatsAllowed:'.jpg, .jpeg, .png, .gif',
            maxSize:'50',
            uploadAPI:{
                url:`${environment.url}/profile-image/upload`
            },
            //El archivo se subirá dando click a un botón
            theme:'attachPin',
            //Mostrar barra de progreso
            hideProgressBar:false,
            //Ocultar botón de reset
            hideResetBtn:true,
            hideSelectBtn:false,
            replaceTexts:{
                //Texto del campo
                attachPinBtn:'Sube una imagen de perfil'
            }
        }
    }

    updateUser(){

    }

    setUserFormValues(){

    }

    profileImage(event:any){

    }

    /**
     * Función que muestra un mensaje flash
     * @param message
     * @param cssClass
     * @param timeout
     */
    showFlashMessage(message:string, cssClass:string, timeout:number){
        this._flashMessagesService.show(message,
            {
                cssClass:cssClass,
                timeout:timeout
            }
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
        let message='';
        if (field.errors?.email) message=`El campo ${fieldName} es incorrecto`;       
        return message;
    }
}
