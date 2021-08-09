import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    pageTitle:string;
    user:User;
    goodRegister:boolean;
    form:FormGroup;
    roles:any[];

    constructor(private _userService:UserService, private _flashMessagesService:FlashMessagesService) { 
        this.pageTitle='Registro';
        this.user=new User(null, '', '', '', null, '', false, new Date());
        this.goodRegister=false;
        this.form=new FormGroup({
            nick:new FormControl('', Validators.required),
            email:new FormControl('', Validators.email),
            password:new FormControl('', Validators.required),
            role:new FormControl('', Validators.required)
        });
        this.roles=[
            {backEndRol:"ROLE_READER", frontEndRol:"Lector"},
            {backEndRol:"ROLE_WRITER", frontEndRol:"Redactor"}
        ];
    }

    /**
     * Función que hace el registro
     */
    register(){
        this.setUserFormValues();
        this._userService.register(this.user).subscribe(
            response=>{
                if (response) {
                    this.goodRegister=true;
                }else{
                    this.showFlashMessage('No te has registrado correctamente',
                        'alert alert-danger col-md-3 mt-3 mx-auto', 1500);
                    this.goodRegister=false;
                }    
            },
            error=>{
                this.showFlashMessage('No te has registrado correctamente',
                    'alert alert-danger col-md-3 mt-3 mx-auto', 1500);
                this.goodRegister=false;
            }
        );
    }

    /**
     * Función que da los valores del formulario al usuario
     */
    setUserFormValues(){
        //Con ? evitamos que Angular muestra un mensaje de que el campo puede estar null
        this.user.setNick(this.form.get('nick')?.value);
        this.user.setEmail(this.form.get('email')?.value);
        this.user.setPassword(this.form.get('password')?.value);
        this.user.setRole(this.form.get('role')?.value);
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
    wrongValidationMessage(field:any, fieldName:string) {
        let message='';
        if (field.errors?.required) {
            message=`El campo ${fieldName} es obligatorio`;    
        }else if(field.errors?.email){
            message=`El campo ${fieldName} es incorrecto`;
        }
        return message;
    }
}
