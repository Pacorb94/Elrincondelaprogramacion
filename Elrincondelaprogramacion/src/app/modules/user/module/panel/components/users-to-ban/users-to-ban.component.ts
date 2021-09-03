import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { UserService } from '../../../../service/user.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'users-to-ban',
    templateUrl: './users-to-ban.component.html',
    styleUrls: ['./users-to-ban.component.scss']
})
export class UsersToBanComponent implements OnInit, OnDestroy {
    users:any[];
    profileImageUrl:string;
    usersSubscription:Subscription;
    banSubscription:Subscription;
    loading:boolean;
    noUsers:any;
    //-----Tabla------
    dtOptions:DataTables.Settings;
    dtTrigger:Subject<any>;

    constructor(private _userService:UserService) { 
        this.users=[];
        this.profileImageUrl=`${environment.url}/profile-images/`;
        this.usersSubscription=new Subscription();
        this.banSubscription=new Subscription();
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
        this.banSubscription.unsubscribe();
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
                    let userLoggedIn=this._userService.getUserLoggedIn();
                    response.forEach((user:any)=>{
                        /*Para no banear al usuario admin y al propio usuario logueado añadimos 
                        sólo a los demás*/                  
                        if (user.nick!='admin'&&userLoggedIn.nick!=user.nick) this.users.push(user);                       
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
     * Función que banea a un usuario
     * @param id 
     */
    ban(id:number){
        this.banSubscription=this._userService.ban(id).subscribe(
            response=>{
                if (response) {
                    this.getUsers(true);
                    let userLoggedIn=this._userService.getUserLoggedIn();
                    /*Si el id del usuario baneado es igual al del usuario logueado 
                    se cerrará la sesión*/
                    if (userLoggedIn&&id==userLoggedIn.id) {
                        localStorage.clear();
                        this._userService.setUserLoggedIn$(null);
                    }            
                }
            },
            error=>{}
        );
    }
}