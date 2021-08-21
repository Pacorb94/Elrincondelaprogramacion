import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CreateCommentComponent } from './components/create-comment/create-comment.component';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

@NgModule({
    declarations: [
        CommentListComponent,
        CreateCommentComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FlashMessagesModule.forRoot()
    ],
    exports:[
        CommentListComponent,
        CreateCommentComponent
    ]
})
export class CommentModule { }
