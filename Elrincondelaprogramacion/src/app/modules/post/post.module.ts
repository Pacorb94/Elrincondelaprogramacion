import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostActivePostsComponent } from './components/most-active-posts/most-active-posts.component';
import { PostRoutingModule } from './post-routing.module';

@NgModule({
    declarations: [
        MostActivePostsComponent
    ],
    imports: [
        CommonModule,
        PostRoutingModule
    ],
    //Para que funcione cualquier cosa de este módulo en otro debemos exportarlo
    exports:[
        MostActivePostsComponent,
        PostRoutingModule
    ]
})
export class PostModule { }
