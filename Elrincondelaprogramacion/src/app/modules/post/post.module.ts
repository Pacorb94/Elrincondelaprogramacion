import { PostsListComponent } from './components/posts-list/posts-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';

@NgModule({
    declarations: [
        PostsListComponent
    ],
    imports: [
        CommonModule,
        PostRoutingModule
    ]
})
export class PostModule { }
