import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListComponent } from './components/posts-list/posts-list.component';

const routes: Routes = [
    {
        path: '',
        children:[
            { path:'posts', component:PostsListComponent },
            { path:'**', redirectTo:'' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostRoutingModule { }
