import { Component, Input, OnInit,  } from '@angular/core';
import { CommentService } from '../../service/comment.service';

@Component({
    selector: 'comment-list',
    templateUrl: './comment-list.component.html',
    styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
    @Input()posts:any[];

    constructor(private _commentService:CommentService) { 

    }

    ngOnInit(): void {

    }

    updateComment(id:number){

    }

    deleteComment(id:number){

    }
}
