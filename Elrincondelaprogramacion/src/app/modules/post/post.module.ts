import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentModule } from './../comment/comment.module';
import { WatchPostComponent } from './components/watch-post/watch-post.component';
import { MostActivePostsComponent } from './components/most-active-posts/most-active-posts.component';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { MomentModule } from 'angular2-moment';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        MostActivePostsComponent,
        WatchPostComponent
    ],
    imports: [
        CommonModule,
        CommentModule,
        HttpClientModule,
        FlashMessagesModule.forRoot(),
        MomentModule,
        RouterModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports:[
        MostActivePostsComponent,
        WatchPostComponent
    ]
})
export class PostModule { }
