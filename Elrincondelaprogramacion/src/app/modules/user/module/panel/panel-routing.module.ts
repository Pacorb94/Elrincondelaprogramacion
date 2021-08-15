import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { MainComponent } from './components/main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

const routes: Routes = [
    {
        path: '', component:MainComponent,
        children:[
            {
                path:'my-posts', component:MyPostsComponent
            },
            {
                path:'category-list', component:CategoryListComponent
            },
            {
                path:'create-post', component:CreatePostComponent
            },
            {
                path:'create-category', component:CreateCategoryComponent
            },
            {
                path:'edit-post/:id', component:EditPostComponent
            },
            {
                path:'edit-category/:id', component:EditCategoryComponent
            },
            {
                path:'user-settings', component:UserSettingsComponent
            },
            {
                path:'**', redirectTo:''
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserPanelRoutingModule { }
