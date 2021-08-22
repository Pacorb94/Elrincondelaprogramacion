import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCommentComponent } from './component/create-comment/create-comment.component';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { FlashMessagesModule } from 'angular2-flash-messages';

@NgModule({
    declarations: [
        CreateCommentComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        MomentModule,
        FlashMessagesModule.forRoot()
    ],
    exports:[
        CreateCommentComponent
    ]
})
export class CommentModule { }
