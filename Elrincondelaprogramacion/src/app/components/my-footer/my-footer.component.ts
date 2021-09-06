import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../../modules/post/services/post.service';
import { UserService } from 'src/app/modules/user/service/user.service';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'my-footer',
    templateUrl: './my-footer.component.html',
    styleUrls: ['./my-footer.component.scss']
})
export class MyFooterComponent implements OnInit {
    posts:any[];
    imageUrl:string;
    userLoggedIn:any;
    subscription:Subscription;

    constructor(private _postService:PostService, private _userService:UserService) {
        this.posts=[];
        this.imageUrl=`${environment.url}/posts-images/`;
       this.subscription=new Subscription();
    }

    ngOnInit(): void {
        this.checkUserLoggedIn();
        this.getLastThreePosts();
    }

    /**
     * Función que comprueba si el usuario ha iniciado sesión
     */
    checkUserLoggedIn(){
        this._userService.getUserLoggedIn$().subscribe(
            user=>{
                if (user) {
                    this.userLoggedIn=user;
                }else{
                    this.userLoggedIn=null;
                }
            }
        );
    }

    /**
     * Función que obtiene los 3 últimos posts
     */
    getLastThreePosts() {
        this._postService.getPosts().subscribe(
            response => {
                //Si hay posts nos quedamos con los 3 primeros
                if (response.Posts.length) this.posts=response.Posts.slice(0, 3);               
            }
        );
    }
}
