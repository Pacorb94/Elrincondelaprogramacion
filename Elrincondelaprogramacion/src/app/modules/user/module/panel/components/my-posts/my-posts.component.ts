import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { UserService } from 'src/app/modules/user/service/user.service';
import { PostService } from './../../../../../post/service/post.service';
import { Router } from '@angular/router';
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
    //-----Tabla------
    dtOptions:DataTables.Settings;
    dtTrigger:Subject<any>;

    constructor(private _userService:UserService, private _postService:PostService,
    private _router:Router) {
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
        this.dtOptions = {
            pagingType:'full_numbers',
            pageLength:5,
            language:{url:'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'}
        };
        this.getUserPosts();
    }

    ngOnDestroy(){
        this.userPostsSubscription.unsubscribe();
        this.deletePostSubscription.unsubscribe();
        this.dtTrigger.unsubscribe();
    }

    /**
     * Función que obtiene los posts del usuario
     * @param refreshTable
     */
    getUserPosts(refreshTable:boolean=false){
        this.userPostsSubscription=this._postService.getUserPosts(this.user.id).subscribe(
            response=>{
                if (response.length>0) {
                    this.posts=response;
                    this.loading=false;
                    if (!refreshTable) this.dtTrigger.next();             
                }
            }
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
                }else{
                    this._router.navigate(['/user-panel/my-posts']);
                }         
            },
            error=>{
                this._router.navigate(['/user-panel/my-posts']);
            }
        );
    }
}
