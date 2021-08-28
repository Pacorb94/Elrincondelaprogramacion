import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCommentsComponent } from './components/my-comments/my-comments.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { MainComponent } from './components/main/main.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { InadequatePostsComponent } from './components/inadequate-posts/inadequate-posts.component';
import { InadequateCommentsComponent } from './components/inadequate-comments/inadequate-comments.component';
import { BannedUsersComponent } from './components/banned-users/banned-users.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CheckAdminRoleGuard } from './../../guards/check-admin-role.guard';
import { CheckNoReaderRoleGuard } from './../../guards/check-no-reader-role.guard';

const routes: Routes = [
    {
        path: '', component:MainComponent,
        children:[
            {
                path:'my-posts', component:MyPostsComponent, canActivate:[CheckNoReaderRoleGuard]
            },
            { path:'my-comments', component:MyCommentsComponent },
            { path:'category-list', component:CategoryListComponent, canActivate:[CheckAdminRoleGuard] },
            { path:'create-post', component:CreatePostComponent, canActivate:[CheckNoReaderRoleGuard] },
            {
                path:'create-category', component:CreateCategoryComponent, 
                canActivate:[CheckAdminRoleGuard]
            },
            {
                path:'edit-post/:title', component:EditPostComponent, 
                canActivate:[CheckNoReaderRoleGuard]
            },
            {
                path:'edit-category/:name', component:EditCategoryComponent, 
                canActivate:[CheckAdminRoleGuard]
            },
            { 
                path:'inadequated-', 
                children:[
                    { path:'posts', component:InadequatePostsComponent },
                    { path:'comments', component:InadequateCommentsComponent }
                ],
                canActivate:[CheckAdminRoleGuard]
            },
            { path:'banned-users', component:BannedUsersComponent, canActivate:[CheckAdminRoleGuard] },
            { path:'user-settings', component:UserSettingsComponent },
            { path:'**', redirectTo:'' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserPanelRoutingModule { }
