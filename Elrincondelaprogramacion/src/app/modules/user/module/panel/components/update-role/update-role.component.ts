import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../../../service/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'update-role',
    templateUrl: './update-role.component.html',
    styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit, OnDestroy {
    users:any[];
    roles:any;
    profileImageUrl:string;
    userLoggedIn:any;
    usersSubscription:Subscription;
    rolesSubscription:Subscription;
    updateRoleSubscription:Subscription;
    form:FormGroup;
    loading:boolean;
    noUsers:any;
    //-----Tabla------
    dtOptions:DataTables.Settings;
    dtTrigger:Subject<any>;

    constructor(private _userService:UserService, private _flashMessagesService:FlashMessagesService) { 
        this.users=[];
        this.roles=[];
        this.profileImageUrl=`${environment.url}/profile-images/`;
        this.userLoggedIn=this._userService.getUserLoggedIn();
        this.usersSubscription=new Subscription();
        this.rolesSubscription=new Subscription();
        this.updateRoleSubscription=new Subscription();
        this.form=new FormGroup({
            roles:new FormControl('', Validators.required)
        });
        this.loading=true;
        this.dtOptions={};
        this.dtTrigger=new Subject<any>();
    }

    ngOnInit(): void {
        //Si el tamaño de la ventana es menor o igual a 575
        if (window.outerWidth<=parseInt('575')) window.scroll(0, 550);
        this.loadTableConfiguration();
        this.getUsers();
    }
    
    ngOnDestroy(){
        this.usersSubscription.unsubscribe();
        this.rolesSubscription.unsubscribe();
        this.updateRoleSubscription.unsubscribe();
    }

    /**
     * Función que carga la configuración de la tabla
     */
    loadTableConfiguration(){
        this.dtOptions = {
            pagingType:'full_numbers',
            pageLength:5,
            language:{url:'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'},
            order:[]
        };
    }
    
    /**
     * Función que obtiene los usuarios
     * @param refreshTable
     */
    getUsers(refreshTable:boolean=false){
        this.usersSubscription=this._userService.getUsers().subscribe(
            response=>{
                if (response.length) {
                 
                        /*Para no modificar el rol del usuario admin ni el usuario logueado con rol 
                        de administrador y si el usuario no está baneado añadimos sólo a los demás*/                   
                        
                    this.users=response;                                              
                    this.loading=false;
                    this.noUsers=false;
                    if (!refreshTable) this.dtTrigger.next();             
                }else{
                    this.loading=true;
                    this.noUsers=true;
                }
            },
            error=>{}
        );
    }

    /**
     * Función que obtiene los roles
     */
    getRoles(){
        this.rolesSubscription=this._userService.getRoles().subscribe(
            response=>{
                if (response) {
                    this.roles.frontend=['Administrador', 'Redactor', 'Lector'];
                    this.roles.backend=response; 
                    this.createRolesSelectsOptions();
                }            
            },
            error=>{}
        );
    }
    
    /**
     * Función que crea los options de los selects de los roles
     */
    createRolesSelectsOptions(){
        //Con @ViewChildren no podía usar la función insertAdjacentHTML por alguna razón
        let rolesSelects=document.querySelectorAll('select[name="roles"]');
        for (let rolesSelect of rolesSelects) {
            rolesSelect.innerHTML='';
            rolesSelect.insertAdjacentHTML('beforeend', 
                `<option value="" hidden>Selecciona un rol</option>`);
            //Añadimos los valores a los options
            for (let i = 0; i<this.roles.backend.length; i++) {
                rolesSelect.insertAdjacentHTML('beforeend', 
                    `<option value="${this.roles.backend[i]}">${this.roles.frontend[i]}</option>`);     
            }
        }
    }
    
    /**
     * Función que modifica el rol del usuario
     * @param user
     */
    updateRole(user:any){
        user.roles[0]=this.form.get('roles')?.value;
        this.updateRoleSubscription=this._userService.updateRole(user).subscribe(
            response=>{
                if (response) {
                    //Para indicarle al usuario que le hemos cambiado el rol
                    localStorage.setItem('updatedRole', user.nick);                 
                    this.getUsers(true);
                    //Si el tamaño de la ventana es menor o igual a 575
                    window.outerWidth<=parseInt('575')?window.scroll(0, 550):window.scroll(0, 50); 
                    this.showFlashMessage('Has modificado el rol del usuario',
                        'alert alert-success col-md-5 mt-3 mx-auto text-center', 3000);
                }
            },
            error=>{
                window.outerWidth<=parseInt('575')?window.scroll(0, 550):window.scroll(0, 50); 
                this.showFlashMessage('No has modificado el rol del usuario',
                    'alert alert-danger col-md-5 mt-3 mx-auto text-center', 3000);
            }
        );
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
        if (field.errors?.required) message=`El campo ${fieldName} es obligatorio`;         
        return message;
    }
}