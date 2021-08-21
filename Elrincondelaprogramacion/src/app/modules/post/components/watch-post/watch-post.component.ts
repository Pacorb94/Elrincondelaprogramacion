import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../../user/service/user.service';
import { PostService } from '../../service/post.service';
import { CommentService } from '../../../comment/service/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'watch-post',
    templateUrl: './watch-post.component.html',
    styleUrls: ['./watch-post.component.scss']
})
export class WatchPostComponent implements OnInit, OnDestroy {
    post:any;
    user:any;
    loading:boolean;
    form:FormGroup;
    postSubscription:Subscription;
    addCommentSubscription:Subscription;
    updateCommentSubscription:Subscription;
    deleteCommentSubscription:Subscription;

    constructor(private _postService:PostService, private _userService:UserService,
    private _commentService:CommentService, private _route:ActivatedRoute, private _router:Router, 
    private _flashMessagesService:FlashMessagesService) {
        this.user=this._userService.getUserLoggedIn();
        this.loading=true;
        this.form=new FormGroup({
            content:new FormControl('', Validators.required)
        });
        this.postSubscription=new Subscription();
        this.addCommentSubscription=new Subscription();
        this.updateCommentSubscription=new Subscription();
        this.deleteCommentSubscription=new Subscription();
    }

    ngOnInit(): void {
        this.getRouteParams();
    }

    ngOnDestroy(){
        this.postSubscription.unsubscribe();
        this.addCommentSubscription.unsubscribe();
        this.updateCommentSubscription.unsubscribe();
        this.deleteCommentSubscription.unsubscribe();
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

    /**
     * Función que modifica un comentario
     * @param id 
     */
    updateComment(id:number){

    }

    /**
     * Función que borra un comentario
     * @param id 
     */
    deleteComment(id:number){

    }
    
    /**
     * Función que muestra un mensaje flash
     * @param message
     * @param cssClass
     * @param timeout
     */
    showFlashMessage(message: string, cssClass: string, timeout: number) {
        this._flashMessagesService.show(message,
            {
                cssClass: cssClass,
                timeout: timeout
            }
        );
    }

    /**
     * Función que comprueba si el foco está en el campo
     * @param field
     */
    checkTouched(field: any): boolean {
        if (field.touched) return true;
        return false;
    }

    /**
     * Función que muestra un mensaje de validación incorrecta
     * @param field 
     * @param fieldName 
     */
    wrongValidationMessage(field: any, fieldName: string): string {
        if (field.errors?.required)`El campo ${fieldName} es obligatorio`;
        return '';
    }
}
