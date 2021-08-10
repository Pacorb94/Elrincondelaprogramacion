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
import { InadequateUsersComponent } from './components/inadequate-users/inadequate-users.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { DataTablesModule } from "angular-datatables";
import { MomentModule } from 'angular2-moment';

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
        InadequateUsersComponent,
        UserSettingsComponent
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
