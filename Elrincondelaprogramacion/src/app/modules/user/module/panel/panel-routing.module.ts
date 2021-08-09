import { MainComponent } from './components/main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';


const routes: Routes = [
    {
        path: '', component:MainComponent,
        children:[
            {
                path:'user-settings', component:UserSettingsComponent
            },
            {
                path:'my-posts', component:MyPostsComponent
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
