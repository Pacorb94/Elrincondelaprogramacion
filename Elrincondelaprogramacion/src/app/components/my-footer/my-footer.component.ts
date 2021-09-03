import { Component, OnInit } from '@angular/core';
import { PostService } from '../../modules/post/services/post.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'my-footer',
    templateUrl: './my-footer.component.html',
    styleUrls: ['./my-footer.component.scss']
})
export class MyFooterComponent implements OnInit {
    posts:any[];
    imageUrl:string;
    
    constructor(private _postService:PostService) {
        this.posts=[];
        this.imageUrl=`${environment.url}/posts-images/`;
    }

    ngOnInit(): void {
        this.getLastThreePosts();
    }

    /**
     * Función que obtiene los 3 últimos posts
     */
    getLastThreePosts() {
        this._postService.getPosts().subscribe(
            response => {
                //Si hay posts
                if (response.Posts.length) this.posts=response.Posts.slice(0, 3);               
            }
        );
    }
}
