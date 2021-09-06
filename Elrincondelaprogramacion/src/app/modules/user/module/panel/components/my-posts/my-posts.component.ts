import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { UserService } from '../../../../service/user.service';
import { PostService } from '../../../../../post/services/post.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'my-posts',
    templateUrl: './my-posts.component.html',
    styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit, OnDestroy{
    user:any;
    posts:any[];
    userPostsSubscription:Subscription;
    deletePostSubscription:Subscription;
    loading:boolean;
    imageUrl:string;
    noPosts:any;
    //-----Tabla------
    dtOptions:DataTables.Settings;
    dtTrigger:Subject<any>;

    constructor(private _userService:UserService, private _postService:PostService,
    private _flashMessagesService:FlashMessagesService) {
        this.user=this._userService.getUserLoggedIn();
        this.posts=[];
        this.userPostsSubscription=new Subscription();
        this.deletePostSubscription=new Subscription();
        this.loading=true;
        this.imageUrl=`${environment.url}/posts-images/`;
        this.dtOptions={};
        this.dtTrigger=new Subject<any>();
    }

    ngOnInit(){
        //Si el tamaño de la ventana es menor o igual a 575
        if (window.outerWidth<=parseInt('575')) window.scroll(0, 550);
        this.loadTableConfiguration();
        this.getUserPosts();
    }

    ngOnDestroy(){
        this.userPostsSubscription.unsubscribe();
        this.deletePostSubscription.unsubscribe();
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
     * Función que obtiene los posts del usuario
     * @param refreshTable
     */
    getUserPosts(refreshTable:boolean=false){
        this.userPostsSubscription=this._userService.getUserPosts(this.user.id).subscribe(
            response=>{
                if (response.length) {
                    this.posts=response;
                    this.loading=false;
                    this.noPosts=false;
                    if (!refreshTable) this.dtTrigger.next();             
                }else{
                    this.loading=true;
                    this.noPosts=true;
                }
            },
            error=>{}
        );
    }

    /**
     * Función que borra un post
     * @param id
     */
    deletePost(id:number){
        this.deletePostSubscription=this._postService.delete(id).subscribe(
            response=>{
                if (response) {
                    this.getUserPosts(true);                    
                    this.noPosts=false;   
                    //Si el ancho de la pantalla es menor o igual a 575
                    window.outerWidth<=parseInt('575')?window.scroll(0, 600):window.scroll(0, 50);   
                    this.showFlashMessage('Has borrado el post', 
                        'alert alert-success col-md-5 mt-3 mx-auto text-center', 3000);                
                }        
            },
            error=>{
                window.outerWidth<=parseInt('575')?window.scroll(0, 600):window.scroll(0, 50);
                this.showFlashMessage('No has borrado el post', 
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
