import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCommentComponent } from './component/create-comment/create-comment.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { MomentModule } from 'angular2-moment';

@NgModule({
    declarations: [
        CreateCommentComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule,
        FlashMessagesModule.forRoot(),
        MomentModule
    ],
    exports:[
        CreateCommentComponent
    ]
})
export class CommentModule { }
