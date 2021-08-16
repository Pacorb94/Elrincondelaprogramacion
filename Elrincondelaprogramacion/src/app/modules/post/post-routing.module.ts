import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostsByCategoryComponent } from './components/posts-by-category/posts-by-category.component';

const routes: Routes = [
    { path: 'page/:page', component: PostsListComponent },
    { path: 'posts/categories/:name', component: PostsByCategoryComponent},
    { path: '**', redirectTo:''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class PostRoutingModule { }
