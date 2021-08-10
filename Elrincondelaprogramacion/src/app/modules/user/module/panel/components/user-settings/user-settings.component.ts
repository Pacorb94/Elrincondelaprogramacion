import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../../../service/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
    selector: 'user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnDestroy{
    pageTitle:string;
    user:any;
    form:FormGroup;
    loadUserSubscription:Subscription;
    updateSubscription:Subscription;

    constructor(private _userService:UserService,
    private _flashMessagesService:FlashMessagesService) { 
        this.pageTitle='Ajustes del usuario';
        this.loadUser();
        this.form=new FormGroup({
            nick:new FormControl(this.user.nick),
            email:new FormControl(this.user.email, Validators.email)
        });
        this.loadUserSubscription=new Subscription();
        this.updateSubscription=new Subscription();
    }

    /**
     * Función que carga el usuario
     */
    loadUser(){
        this.loadUserSubscription=this._userService.getUserLoggedIn$().subscribe(
            user=>{
                if (user) this.user=user;
            }
        );
    }

    ngOnDestroy(){
        this.loadUserSubscription.unsubscribe();
        this.updateSubscription.unsubscribe();
    }

    /**
     * Función que actualiza el usuario
     */
    updateUser(){
        this.setUserFormValues();
        localStorage.setItem('urlForUploadImage', 'user');
        this.updateSubscription=this._userService.update(this.user).subscribe(
            response=>{
                if (response) {
                    this.user=response;
                    this.user.password=this._userService.getPasswordForRefreshToken();
                    /*Volvemos a iniciar sesión para que se cree un nuevo token con los nuevos datos 
                    del usuario*/
                    this._userService.login(this.user.email, this.user.password).subscribe(
                        response=>{
                            if (response) {
                                this.user=response[0];
                                localStorage.setItem('user', JSON.stringify(this.user));
                                //Le damos al BehaviourSubject el nuevo usuario
                                this._userService.setUserLoggedIn$(this.user);
                            }
                        }
                    );
                    this.showFlashMessage('Has modificado tu perfil',
                        'alert alert-success col-md-4 mt-3 mx-auto', 1500);
                }else{
                    this.showFlashMessage('No has modificado tu perfil correctamente',
                        'alert alert-danger col-md-3 mt-3 mx-auto', 1500);
                }
            },
            error=>{
                this.showFlashMessage('No has modificado tu perfil correctamente',
                    'alert alert-danger col-md-3 mt-3 mx-auto', 1500);
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
