import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/user/service/user.service';
import { PostService } from './../../../../../../services/post.service';


@Component({
    selector: 'my-posts',
    templateUrl: './my-posts.component.html',
    styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit{
    user:any;
    posts:any[];

    constructor(private _userService:UserService, private _postService:PostService) {
        this.loadUser();
        this.posts=[];
    }

    ngOnInit(){
        this.getPostsByUser();
    }
    
    /**
     * Función que carga el usuario
     */
    loadUser(){
        this._userService.getUserLoggedIn$().subscribe(
            user=>{
                if (user) this.user=user;
            }
        );
    }

    /**
     * Función que obtiene los posts del usuario
     */
    getPostsByUser(){
        this._postService.getPostsByUser(this.user.id).subscribe(
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
