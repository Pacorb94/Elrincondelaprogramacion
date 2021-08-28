import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../../user/service/user.service';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'watch-post',
    templateUrl: './watch-post.component.html',
    styleUrls: ['./watch-post.component.scss']
})
export class WatchPostComponent implements OnInit, OnDestroy {
    post:any;
    user:any;
    postImage:any;
    loading:boolean;
    postSubscription:Subscription;
    postImageSubscription:Subscription;
    
    constructor(private _postService:PostService, private _userService:UserService,
    private _route:ActivatedRoute, private _router:Router, private _sanitizer:DomSanitizer) {
        this.user=this._userService.getUserLoggedIn();
        this.loading=true;
        this.postSubscription=new Subscription();
        this.postImageSubscription=new Subscription();
    }

    ngOnInit(): void {
        this.getRouteParams();
    }

    ngOnDestroy(){
        this.postSubscription.unsubscribe();
        this.postImageSubscription.unsubscribe();
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
                    this.postImage=this.post.image;
                    this.loadImage();
                } else {
                    this.loading = true;
                }
            },
            error => {
                this._router.navigate(['']);
            }
        );
    }

    /**
     * Función que carga la imagen del post, si no tiene o hay un error se asigna una por
     * defecto
     */
    loadImage(){
        if (this.postImage) {    
            this.postImageSubscription=this._postService.getImage(this.postImage)
                .subscribe(
                    response=>{
                        let imageURL=URL.createObjectURL(response);
                        this.postImage=this._sanitizer.bypassSecurityTrustUrl(imageURL);
                    },
                    error=>{
                        this.postImage='../../../../../assets/images/no-post-image.jpg';
                    }
                );
        }else{
            this.postImage='../../../../../assets/images/no-post-image.jpg';
        }
    }
}
