import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './../../../user/service/user.service';
import { CommentService } from '../../service/comment.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'comment-list',
    templateUrl: './comment-list.component.html',
    styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit, OnDestroy {
    @Input()post:any;
    user:any;
    deleteCommentSubscription:Subscription;

    constructor(private _userService:UserService, private _commentService:CommentService) { 
        this.user=this._userService.getUserLoggedIn();
        this.deleteCommentSubscription=new Subscription();
    }

    ngOnInit(): void {

    }

    ngOnDestroy(){

    }

    updateComment(id:number){

    }

    deleteComment(id:number){

    }
}
