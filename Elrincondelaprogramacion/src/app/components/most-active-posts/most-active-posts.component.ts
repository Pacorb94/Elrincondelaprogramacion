import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../../modules/post/services/post.service';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'most-active-posts',
	templateUrl: './most-active-posts.component.html',
	styleUrls: ['./most-active-posts.component.scss']
})
export class MostActivePostsComponent implements OnInit, OnDestroy {
	posts:any;
	imageUrl:string;
	loading:boolean;
	noPosts:any;
	postsSubscription:Subscription;

	constructor(private _postService:PostService) {
		this.loading=true;
		this.imageUrl=`${environment.url}/posts-images/`;
		this.postsSubscription=new Subscription();
	}

	ngOnInit(): void {
		this.getMostActivePosts();
	}
	
	ngOnDestroy(){
		this.postsSubscription.unsubscribe();
	}

	/**
     * Función que obtiene los posts más activos
     */
	getMostActivePosts() {
        this.postsSubscription=this._postService.getMostActivePosts().subscribe(
            response => {
                //Si hay posts
                if (response.length) {
                    this.loading = false;
					//Nos quedamos con los 3 primeros posts
					this.posts=response.slice(0, 3);
                } else {
                    this.loading = true;
                    this.noPosts=true;
                }
            },
            error => {}
        );
    }
}