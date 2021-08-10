import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/modules/user/service/user.service';
import { PostService } from './../../../../../../services/post.service';

@Component({
    selector: 'my-posts',
    templateUrl: './my-posts.component.html',
    styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnDestroy{
    user:any;
    posts:any[];
    subscription:Subscription;

    constructor(private _userService:UserService, private _postService:PostService) {
        this.user=this._userService.getUserLoggedIn();
        this.posts=[];
        this.subscription=new Subscription();
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

    /**
     * Función que obtiene los posts del usuario
     */
    getPostsByUser(){
        this.subscription=this._postService.getPostsByUser(this.user.id).subscribe(
            response=>{
                if (response) {
                   
                  
                    console.log(response);
                }
            },
            error=>{

            }
        );
    }
}
