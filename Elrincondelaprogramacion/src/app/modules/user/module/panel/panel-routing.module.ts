import { MainComponent } from './components/main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoggedInGuard } from 'src/app/modules/user/guards/user-logged-in.guard';

const routes: Routes = [
    {
        path: '',
        children:[
            {
                path:'', component:MainComponent, canActivate:[UserLoggedInGuard]
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
