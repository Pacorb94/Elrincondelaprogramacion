import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPanelRoutingModule } from './panel-routing.module';
import { MainComponent } from './components/main/main.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { MyCommentsComponent } from './components/my-comments/my-comments.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { InadequatePostsComponent } from './components/inadequate-posts/inadequate-posts.component';
import { InadequateCommentsComponent } from './components/inadequate-comments/inadequate-comments.component';
import { UserListComponent } from './components/user-list/user-listcomponent';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { DataTablesModule } from "angular-datatables";
import { MomentModule } from 'angular2-moment';
import { FileUploaderPostComponent } from './components/file-uploader-post/file-uploader-post.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { UpdateRoleComponent } from './components/update-role/update-role.component';

@NgModule({
    declarations: [
        MainComponent,
        FileUploaderComponent,
        EditPostComponent,
        MyCommentsComponent,
        MyPostsComponent,
        CreatePostComponent,
        CreateCategoryComponent,
        EditCategoryComponent,
        InadequatePostsComponent,
        InadequateCommentsComponent,
        UserListComponent,
        UserSettingsComponent,
        FileUploaderPostComponent,
        CategoryListComponent,
        UpdateRoleComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FlashMessagesModule.forRoot(),
        UserPanelRoutingModule,
        FileUploadModule,
        DataTablesModule,
        MomentModule
    ]
})
export class UserPanelModule { }
