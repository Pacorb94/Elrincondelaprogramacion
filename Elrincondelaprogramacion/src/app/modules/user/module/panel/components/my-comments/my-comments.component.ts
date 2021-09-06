import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { UserService } from 'src/app/modules/user/service/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'my-comments',
    templateUrl: './my-comments.component.html',
    styleUrls: ['./my-comments.component.scss']
})
export class MyCommentsComponent implements OnInit, OnDestroy {
    user:any;
    comments:any[];
    loading:boolean;
    commentsSubscription:Subscription;
    noComments:any;
    //-----Tabla------
    dtOptions:DataTables.Settings;
    dtTrigger:Subject<any>;
    fragment:any;

    constructor(private _userService:UserService, private _router:Router) {
        this.user=this._userService.getUserLoggedIn();
        this.comments=[];
        this.loading=true;
        this.commentsSubscription=new Subscription();
        this.dtOptions={};
        this.dtTrigger=new Subject<any>();
    }

    ngOnInit(): void {
        this.loadTableConfiguration();
        this.getUserComments();
    }

    ngOnDestroy(){
        this.commentsSubscription.unsubscribe();
        this.dtTrigger.unsubscribe();
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
     * Función que obtiene los cometarios de un usuario
     */
    getUserComments(){
        this.commentsSubscription=this._userService.getComments(this.user.id).subscribe(
            response=>{
                if (response.length>0) {
                    this.comments=response;
                    this.loading=false;   
                    this.noComments=false;
                    this.dtTrigger.next();         
                }else{
                    this.loading=true;
                    this.noComments=true;
                }
            },
            error=>{
                this._router.navigate(['']);
            }
        );
    }
}