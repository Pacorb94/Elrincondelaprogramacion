import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../../../service/user.service';
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
    usersSubscription:Subscription;
    rolesSubscription:Subscription;
    updateRoleSubscription:Subscription;
    form:FormGroup;
    loading:boolean;
    noUsers:any;
    //-----Tabla------
    dtOptions:DataTables.Settings;
    dtTrigger:Subject<any>;

    constructor(private _userService:UserService) { 
        this.users=[];
        this.roles=[];
        this.profileImageUrl=`${environment.url}/profile-images/`;
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
            language:{url:'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'}
        };
    }

    /**
     * Función que obtiene los roles
     */
    getRoles(){
        this.rolesSubscription=this._userService.getRoles().subscribe(
            response=>{
                if (response.length) {
                    this.roles.frontend=['Administrador', 'Redactor', 'Lector'];
                    this.roles.backend=response; 
                } 
                console.log(this.roles);            
            },
            error=>{}
        );
    }
    
    /**
     * Función que obtiene los usuarios
     * @param refreshTable
     */
    getUsers(refreshTable:boolean=false){
        this.usersSubscription=this._userService.getUsers().subscribe(
            response=>{
                if (response.length) {
                    response.forEach((user:any)=>{
                        //Para no modificar el rol del usuario admin añadimos sólo a los demás
                        if (user.nick!='admin') this.users.push(user);                       
                    });                   
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
     * Función que modifica el rol del usuario
     * @param userId 
     */
    updateRole(userId:number){
        
        /*this.updateRoleSubscription=this._userService.updateRole(userId, rol).subscribe(
            response=>{
                if (response.length) {
                    this.getUsers(true);
                }
            },
            error=>{}
        );*/
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