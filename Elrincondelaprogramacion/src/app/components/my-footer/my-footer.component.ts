import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { PostService } from '../../modules/post/services/post.service';

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
        this.getLastThreePosts();
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

    /**
     * Función que obtiene los 3 últimos posts
     */
    getLastThreePosts() {
        this.subscription=this._postService.getPosts().subscribe(
            response => {
                //Si hay posts
                if (response.Posts.length) this.posts=response.Posts.slice(0, 3);               
            }
        );
    }
}
