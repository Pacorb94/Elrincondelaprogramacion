import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { UserService } from '../../../user/service/user.service';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'comment-list',
    templateUrl: './comment-list.component.html',
    styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit, OnDestroy {
    @Input()post:any;
    comments!:any[];
    user:any;
    profileImageUrl:string;
    updateCommentListSubscription:Subscription;
    getPostCommentsSubscription:Subscription;
    deleteCommentSubscription:Subscription;
    //------Paginación-------
    page: any;
    prevPage: number;
    nextPage: number;
    totalPages: number[];

    constructor(private _userService:UserService, private _postService:PostService,
    private _commentService:CommentService, private _route: ActivatedRoute) {   
        this.user=this._userService.getUserLoggedIn();
        this.profileImageUrl=`${environment.url}/profile-images/`;
        this.updateCommentListSubscription=new Subscription();
        this.getPostCommentsSubscription=new Subscription();
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
        this.getPostCommentsSubscription=this._postService
            .getPostComments(this.page, this.post.id).subscribe(
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
     * Función que actualiza la lista de comentarios si hay un nuevo o se ha editado
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
    
    deleteComment(id:number){

    }
}
