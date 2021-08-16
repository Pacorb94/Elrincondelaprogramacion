import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostRoutingModule } from './post-routing.module';
import { PostsByCategoryComponent } from './components/posts-by-category/posts-by-category.component';

@NgModule({
    declarations: [
        PostsListComponent,
        PostsByCategoryComponent
    ],
    imports: [
        CommonModule,
        PostRoutingModule
    ],
    //Para que funcione cualquier cosa de este módulo en otro debemos exportarlo
    exports:[
        PostsListComponent,
        PostRoutingModule
    ]
})
export class PostModule { }
