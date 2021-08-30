import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { CommentService } from './../../../../../post/services/comment.service';

@Component({
    selector: 'inadequate-comments',
    templateUrl: './inadequate-comments.component.html',
    styleUrls: ['./inadequate-comments.component.scss']
})
export class InadequateCommentsComponent implements OnInit, OnDestroy {
    comments:any[];
    loading:boolean;
    commentsSubscription:Subscription;
    noComments:any;
    //-----Tabla------
    dtOptions:DataTables.Settings;
    dtTrigger:Subject<any>;
    fragment:any;

    constructor(private _commentService:CommentService) {
        this.comments=[];
        this.loading=true;
        this.commentsSubscription=new Subscription();
        this.dtOptions={};
        this.dtTrigger=new Subject<any>();
    }

    ngOnInit(): void {
        this.loadTableConfiguration();
        this.getInadequates();
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
            language:{url:'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'}
        };
    }
    
    /**
     * Función que obtiene los comentarios inadecuados
     */
    getInadequates(){
        this.commentsSubscription=this._commentService.getInadequates().subscribe(
            response=>{
                if (response.length) {
                    this.comments=response;
                    this.loading=false;
                    this.noComments=false; 
                    this.dtTrigger.next();           
                }else{
                    this.loading=true;
                    this.noComments=true;
                }
            },
            error=>{}
        );
    }
}
