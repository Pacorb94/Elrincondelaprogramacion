import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../../user/service/user.service';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'watch-post',
    templateUrl: './watch-post.component.html',
    styleUrls: ['./watch-post.component.scss']
})
export class WatchPostComponent implements OnInit, OnDestroy {
    post:any;
    user:any;
    loading:boolean;
    postSubscription:Subscription;
    
    constructor(private _postService:PostService, private _userService:UserService,
    private _route:ActivatedRoute, private _router:Router) {
        this.user=this._userService.getUserLoggedIn();
        this.loading=true;
        this.postSubscription=new Subscription();
    }

    ngOnInit(): void {
        this.getRouteParams();
    }

    ngOnDestroy(){
        this.postSubscription.unsubscribe();
    }

    /**
     * Función que obtiene los parámetros de la ruta
     */
    getRouteParams() {
        this._route.params.subscribe(
            params => {
                let title = params['title']; 
                this.getPost(title);                                      
            }
        );
    }

    /**
     * Función que obtiene un post
     * @param title
     */
    getPost(title:string) {
        this.postSubscription=this._postService.getPost(title).subscribe(
            response => {
                //Si hay posts
                if (response) {
                    this.loading = false;
                    this.post = response;
                } else {
                    this.loading = true;
                }
            },
            error => {
                this._router.navigate(['']);
            }
        );
    }
}
