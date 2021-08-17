import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { PostService } from './../../modules/post/service/post.service';

@Component({
    selector: 'my-footer',
    templateUrl: './my-footer.component.html',
    styleUrls: ['./my-footer.component.scss']
})
export class MyFooterComponent implements OnInit, OnDestroy {
    posts:any[];
    imageUrl:string;
    subscription:Subscription;
    
    constructor(private _postService:PostService) {
        this.posts=[];
        this.imageUrl=`${environment.url}/posts-images/`;
        this.subscription=new Subscription();
    }

    ngOnInit(): void {
        this.getPosts();
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

    /**
     * Función que obtiene los posts
     */
    getPosts() {
        this.subscription=this._postService.getPosts().subscribe(
            response => {
                //Si hay posts
                if (response.Posts.length) {
                   /* let postsNumber=response.Posts.length;
                    let getPostsNumber=0;
                    switch (postsNumber) {
                        case 1: getPostsNumber=1 break;
                        case 2:break;
                        case 3:break;             
                    }*/
                    let posts=response.Posts;
                    posts.slice(0, 3).forEach((post:any)=>{
                        this.posts.push(post);
                    });
                    console.log(this.posts);
                }
            },
            error => {}
        );
    }
}
