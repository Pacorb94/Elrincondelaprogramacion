import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../../modules/post/services/post.service';
import { Router } from '@angular/router';
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

	constructor(private _postService:PostService, private _router:Router) {
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
					/*Ordenamos de forma descendente los posts por número de comentarios y luego
					nos quedamos con los 3 primeros posts*/
					this.posts=response.sort(
						(a:any, b:any)=>parseInt(b.comments.length)-parseInt(a.comments.length)
					).slice(0, 3);
                } else {
                    this.loading = true;
                    this.noPosts=true;
                }
            },
            error => {
                this._router.navigate(['']);
            }
        );
    }
}
