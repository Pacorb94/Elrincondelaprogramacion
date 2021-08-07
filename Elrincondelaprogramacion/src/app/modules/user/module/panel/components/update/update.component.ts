import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../../../service/user.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
    selector: 'update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
    pageTitle:string;
    user:any;
    form:FormGroup;

    constructor(private _userService:UserService, private _router:Router,
    private _flashMessagesService:FlashMessagesService) { 
        this.pageTitle='Ajustes del usuario';
        this.user=this._userService.getUserLoggedIn();
        this.form=new FormGroup({
            nick:new FormControl(this.user.nick),
            email:new FormControl(this.user.email, Validators.email)
        });
    }

    /**
     * Función que actualiza el usuario
     */
    updateUser(){
        this.setUserFormValues();
        this._userService.update(this.user).subscribe(
            response=>{
                if (response) {
                    this.user=response;
                    //Le damos al BehaviourSubject el nuevo usuario
                    this._userService.setUserLoggedIn$(this.user);
                    localStorage.setItem('user', JSON.stringify(this.user));
                    //Volvemos a iniciar sesión para que se cree un nuevo token con los nuevos datos del usuario
                    console.log(this.user.email);
                    this._userService.login(this.user.email, this.user.password);
                    this.showFlashMessage('Has modificado tu perfil',
                        'alert alert-success col-md-4 mt-3 mx-auto', 1500);
                }else{
                    this.showFlashMessage('No has modificado tu perfil correctamente',
                        'alert alert-danger col-md-3 mt-3 mx-auto', 1500);
                    this._userService.setUserLoggedIn$(null);
                }
            },
            error=>{
                this.showFlashMessage('No has modificado tu perfil correctamente',
                    'alert alert-danger col-md-3 mt-3 mx-auto', 1500);
                this._userService.setUserLoggedIn$(null);
                this._router.navigate(['']);
            }
        );
    }

    /**
     * Función que establece los campos del formulario al usuario
     */
    setUserFormValues(){
        if (this.form.get('nick')?.value) this.user.nick=this.form.get('nick')?.value;
        if (this.form.get('email')?.value) this.user.email=this.form.get('email')?.value;
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
