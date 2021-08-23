import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './../../../user/service/user.service';
import { PostService } from './../../../post/service/post.service';
import { CommentService } from '../../service/comment.service';
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
    updateCommentListSubscription:Subscription;
    getPostCommentsSubscription:Subscription;
    deleteCommentSubscription:Subscription;

    constructor(private _userService:UserService, private _postService:PostService,
    private _commentService:CommentService) {   
        this.user=this._userService.getUserLoggedIn();
        this.updateCommentListSubscription=new Subscription();
        this.getPostCommentsSubscription=new Subscription();
        this.deleteCommentSubscription=new Subscription();
    }

    ngOnInit(): void {
        this.getPostComments(); 
        this.updateCommentList();
    }

    ngOnDestroy(){
        this.updateCommentListSubscription.unsubscribe();
        this.getPostCommentsSubscription.unsubscribe();
        this.deleteCommentSubscription.unsubscribe();
    }
    
    /**
     * Función que obtiene los comentarios de un post
     */
    getPostComments(){
        this.getPostCommentsSubscription=this._postService.getPostComments(this.post.id).subscribe(
            response=>{
                this.comments=response;
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
    
    deleteComment(id:number){

    }
}
