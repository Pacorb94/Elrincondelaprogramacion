import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
    pageTitle:string;
    user:any;
    form:FormGroup;
    @ViewChild('check', {static:false}) checkbox:any;

    constructor(private _userService:UserService, private _router:Router, 
    private _flashMessagesService:FlashMessagesService, private _cdRef:ChangeDetectorRef) {
        this.pageTitle='Login';
        this.form=new FormGroup({
            email:new FormControl('', [Validators.required, Validators.email]),
            password:new FormControl('', Validators.required),
            check:new FormControl(false)
        });
    }

    //Para que podamos seleccionar elementos HTML debemos esperar a que cargue la vista
    ngAfterViewInit(){
        this.fillEmailAndMarkCheckbox();
    }

    /**
     * Función que rellena el campo email con el localStorage y marca el checkbox
     */
    fillEmailAndMarkCheckbox(){
        //Si existe
        if (localStorage.hasOwnProperty('rememberEmail')) {
            this.form.get('email')?.setValue(localStorage.getItem('rememberEmail'));
            this.checkbox.nativeElement.checked=true;
            this._cdRef.detectChanges();
        }
    }

    /**
     * Función que inicia sesión
     */
    login(){
        let email=this.form.get('email')?.value;
        let password=this.form.get('password')?.value;
        this._userService.login(email, password).subscribe(
            response=>{
                if (response) {
                    this.user=response[0];
                    localStorage.setItem('user', JSON.stringify(this.user));
                    //Le damos el usuario logueado al BehaviourSubject
                    this._userService.setUserLoggedIn$(this.user);
                    this._router.navigate(['/']);
                } else {
                    this.showFlashMessage('No has iniciado sesión correctamente',
                        'alert alert-danger col-md-4 mt-3 mx-auto', 1500);
                    //Le damos null al BehaviourSubject
                    this._userService.setUserLoggedIn$(null);
                }
            },
            error=>{
                this.showFlashMessage('No has iniciado sesión correctamente',
                    'alert alert-danger col-md-4 mt-3 mx-auto', 1500);
                this._userService.setUserLoggedIn$(null);
                //Limpiamos el campo de la contraseña
                this.form.get('password')?.setValue(this.form.get('password')?.value);
            }
        )
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
     * Función que guarda el email si se marca el checkbox y sino se borra el
     * email del localstorage
     * @param event 
     */
    rememberEmail(event:any){
        if (event.target.checked&&this.form.get('email')?.value) {
            let email=this.form.get('email')?.value;
            localStorage.setItem('rememberEmail', email);
        } else if(event.target.checked==false&&localStorage.hasOwnProperty('rememberEmail')){
            localStorage.removeItem('rememberEmail');
        }
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
        //Con ? le decimos que puede haber errores sino no funciona
        if (field.errors?.email) {
            message=`El campo ${fieldName} es incorrecto`;        
        }else if(field.errors?.required){
            message=`El campo ${fieldName} es obligatorio`;
        }
        return message;
    }
}
