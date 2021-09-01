import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { PostService } from '../../../../../post/services/post.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'inadequate-posts',
    templateUrl: './inadequate-posts.component.html',
    styleUrls: ['./inadequate-posts.component.scss']
})
export class InadequatePostsComponent implements OnInit, OnDestroy {
    posts:any[];
    postsSubscription:Subscription;
    loading:boolean;
    imageUrl:string;
    noPosts:any;
    //-----Tabla------
    dtOptions:DataTables.Settings;
    dtTrigger:Subject<any>;

    constructor(private _postService:PostService) { 
        this.posts=[];
        this.postsSubscription=new Subscription();
        this.loading=true;
        this.imageUrl=`${environment.url}/posts-images/`;
        this.dtOptions={};
        this.dtTrigger=new Subject<any>();
    }

    ngOnInit(): void {
        this.loadTableConfiguration();
        this.getInadequates();
    }
    
    ngOnDestroy(){
        this.postsSubscription.unsubscribe();
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
     * Función que obtiene los posts inadecuados
     */
    getInadequates(){
        this.postsSubscription=this._postService.getInadequates().subscribe(
            response=>{
                if (response.length) {
                    this.posts=response;
                    this.loading=false;
                    this.noPosts=false; 
                    this.dtTrigger.next();           
                }else{
                    this.loading=true;
                    this.noPosts=true;
                }
            },
            error=>{}
        );
    }
}