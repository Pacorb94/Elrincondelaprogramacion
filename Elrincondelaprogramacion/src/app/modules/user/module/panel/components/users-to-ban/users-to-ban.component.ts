import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { UserService } from '../../../../service/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'users-to-ban',
    templateUrl: './users-to-ban.component.html',
    styleUrls: ['./users-to-ban.component.scss']
})
export class UsersToBanComponent implements OnInit, OnDestroy {
    users:any[];
    profileImageUrl:string;
    userLoggedIn:any;
    usersSubscription:Subscription;
    banSubscription:Subscription;
    loading:boolean;
    noUsers:any;
    //-----Tabla------
    dtOptions:DataTables.Settings;
    dtTrigger:Subject<any>;

    constructor(private _userService:UserService, private _flashMessagesService:FlashMessagesService) { 
        this.users=[];
        this.profileImageUrl=`${environment.url}/profile-images/`;
        this.userLoggedIn=this._userService.getUserLoggedIn();
        this.usersSubscription=new Subscription();
        this.banSubscription=new Subscription();
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
     * Función que banea a un usuario
     * @param id 
     */
    ban(id:number){
        this.banSubscription=this._userService.ban(id).subscribe(
            response=>{
                if (response) {
                    this.getUsers(true);
                    //Si el tamaño de la ventana es menor o igual a 575
                    window.outerWidth<=parseInt('575')?window.scroll(0, 550):window.scroll(0, 50);
                    this.showFlashMessage('Has baneado al usuario', 
                        'alert alert-success col-md-5 mt-3 mx-auto text-center', 3000);
                    let userLoggedIn=this._userService.getUserLoggedIn();
                    /*Si el id del usuario baneado es igual al del usuario logueado 
                    se cerrará la sesión*/
                    if (userLoggedIn&&id==userLoggedIn.id) {
                        localStorage.clear();
                        this._userService.setUserLoggedIn$(null);
                    }            
                }
            },
            error=>{
                window.outerWidth<=parseInt('575')?window.scroll(0, 550):window.scroll(0, 50);
                this.showFlashMessage('No has baneado al usuario', 
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
}