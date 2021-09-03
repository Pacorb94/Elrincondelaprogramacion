import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../../../service/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
    selector: 'user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit, OnDestroy{
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
            nick:new FormControl(this.user.nick, Validators.required),
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
                if(user) this.user=user;
            }
        );
    }

    ngOnInit(){
        //Si el tamaño de la ventana es menor o igual a 575
        if (window.outerWidth<=parseInt('575')) window.scroll(0, 550);
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
                    //Si el tamaño de la ventana es menor o igual a 575
                    window.outerWidth<=parseInt('575')?window.scroll(0, 550):window.scroll(0, 50); 
                    this.showFlashMessage('Has modificado tu perfil',
                        'alert alert-success col-md-4 mt-3 mx-auto', 3000);
                }
            },
            error=>{
                window.outerWidth<=parseInt('575')?window.scroll(0, 550):window.scroll(0, 50); 
                this.showFlashMessage('No has modificado tu perfil',
                    'alert alert-danger col-md-5 mt-3 mx-auto', 3000);
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
