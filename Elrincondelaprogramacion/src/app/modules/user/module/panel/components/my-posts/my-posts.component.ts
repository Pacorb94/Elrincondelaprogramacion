import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { UserService } from 'src/app/modules/user/service/user.service';
import { PostService } from './../../../../../../services/post.service';

@Component({
    selector: 'my-posts',
    templateUrl: './my-posts.component.html',
    styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit, OnDestroy{
    user:any;
    posts:any[];
    subscription:Subscription;
    loading:boolean;
    //-----Tabla------
    dtOptions:DataTables.Settings;
    dtTrigger:Subject<any>;

    constructor(private _userService:UserService, private _postService:PostService) {
        this.user=this._userService.getUserLoggedIn();
        this.posts=[];
        this.subscription=new Subscription();
        this.loading=true;
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
        this.subscription.unsubscribe();
        this.dtTrigger.unsubscribe();
    }

    /**
     * Función que obtiene los posts del usuario
     */
    getUserPosts(){
        this.subscription=this._postService.getUserPosts(this.user.id).subscribe(
            response=>{
                if (response.Posts.length) {
                    this.posts=response.Posts;
                    this.loading=false;
                    this.dtTrigger.next();             
                }
            }
        );
    }
}
