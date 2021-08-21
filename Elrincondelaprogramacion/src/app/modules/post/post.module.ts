import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
        HttpClientModule,
        FlashMessagesModule.forRoot(),
        MomentModule,
        RouterModule,
        ReactiveFormsModule
    ],
    exports:[
        MostActivePostsComponent,
        WatchPostComponent
    ]
})
export class PostModule { }
