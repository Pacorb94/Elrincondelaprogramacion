import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../../user/service/user.service';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'comment-list',
    templateUrl: './comment-list.component.html',
    styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit, OnDestroy {
    @Input()post:any;
    comments:any[];
    user:any;
    profileImageUrl:string;
    updateCommentListSubscription:Subscription;
    getPostCommentsSubscription:Subscription;
    inadequateSubscription:Subscription;
    deleteCommentSubscription:Subscription;
    //------Paginación-------
    page: any;
    prevPage: number;
    nextPage: number;
    totalPages: number[];

    constructor(private _userService:UserService, private _postService:PostService,
    private _commentService:CommentService, private _route: ActivatedRoute,
    private _flashMessagesService: FlashMessagesService) {   
        this.comments=[];
        this.user=this._userService.getUserLoggedIn();
        this.profileImageUrl=`${environment.url}/profile-images/`;
        this.updateCommentListSubscription=new Subscription();
        this.getPostCommentsSubscription=new Subscription();
        this.inadequateSubscription=new Subscription();
        this.deleteCommentSubscription=new Subscription();
        this.prevPage = 0;
        this.nextPage = 0;
        this.totalPages = [];
    }

    ngOnInit(): void {
        this.getRouteParams();
    }

    ngOnDestroy(){
        this.updateCommentListSubscription.unsubscribe();
        this.getPostCommentsSubscription.unsubscribe();
        this.inadequateSubscription.unsubscribe();
        this.deleteCommentSubscription.unsubscribe();
    }

    /**
     * Función que obtiene los parámetros de la ruta
     */
    getRouteParams() {
        this._route.params.subscribe(
            params => {
                this.page = params['page'];
                //Si tiene valor y es un número sino será el por defecto
                if (this.page && this.page.match(/[\d]+/)) {
                    this.page = Number.parseInt(this.page);
                } else {
                    this.page = 1;
                    this.prevPage = 1;
                    this.nextPage = 2;
                }
                this.getPostComments();
                this.updateCommentList();                     
            }
        );
    }
    
    /**
     * Función que obtiene los comentarios de un post
     */
    getPostComments(){
        this.getPostCommentsSubscription=this._postService.getPostComments(this.page, this.post.id)
            .subscribe(
                response=>{
                    if (response.Comments.length) {
                        this.comments=response.Comments;
                        this.pagination(response.totalPages);
                    }                   
                },
                error=>{}
            );              
    }

    /**
     * Función que marca como inadecuado un comentario
     * @param commentId 
     */
    markAsInadequate(commentId:number){
        this.inadequateSubscription=this._commentService.inadequate(commentId).subscribe(
            response=>{
                //Actualizamos la vista sin recargarla
                if (response) {
                    this.getRouteParams();
                    //Desplazamos la ventana
                    window.scrollTo(0, 400);
                    this.showFlashMessage('Has marcado como inadecuado el comentario',
                        'alert alert-success col-md-7 text-center mx-auto', 3000);  
                }       
            },
            error=>{
                window.scrollTo(0, 400);
                this.showFlashMessage('No has marcado como inadecuado el comentario',
                    'alert alert-danger col-md-7 text-center mx-auto', 3000);  
            }
        );
    }

    /**
     * Función que actualiza la lista de comentarios si hay uno nuevo o se ha editado
     */
    updateCommentList(){
        this.updateCommentListSubscription=this._commentService.getUpdatedCommentList$().subscribe(
            updateCommentList=>{
                if (updateCommentList) this.getPostComments();         
            }
        );
    }

    /**
     * Función que hace la paginación
     * @param totalPages
     */
    pagination(totalPages: any) {
        //Reiniciamos la variable
        this.totalPages = [];
        for (let page = 1; page <= totalPages; page++) this.totalPages.push(page);
        /*Si la página actual es la 2 o más, la página anterior será 1 menos a 
        la actual sino será la 1*/
        if (this.page >= 2) {
            this.prevPage = this.page - 1;
        } else {
            this.prevPage = 1;
        }
        /*Si la página actual es menor al total de páginas, la página siguiente será 
        la actual más 1 sino la página siguiente será la última*/
        if (this.page < totalPages) {
            this.nextPage = this.page + 1;
        } else {
            this.nextPage = totalPages;
        }
    }
    
    /**
     * Función que borra un comentario
     * @param id 
     */
    delete(id:number){
        this.deleteCommentSubscription=this._commentService.delete(id).subscribe(
            response=>{
                if (response) {
                    this._commentService.setUpdatedCommentList$(true);
                    //Desplazamos la ventana
                    window.scrollTo(0, 400);
                    this.showFlashMessage('Has borrado el comentario',
                        'alert alert-success col-md-7 text-center mx-auto', 3000);
                }
            },
            error=>{
                window.scrollTo(0, 400);
                this.showFlashMessage('No has borrado el comentario',
                    'alert alert-danger col-md-7 text-center mx-auto', 3000);
            }
        );
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
}
