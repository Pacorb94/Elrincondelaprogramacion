import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { CheckRegisterLoginGuard } from './guards/check-register-login.guard';
import { UserLoggedInGuard } from './guards/user-logged-in.guard';

const routes: Routes = [
    {
        //Este path está vacío porque vendrá de la ruta padre (app-routing.module.ts)
        path:'', 
        children: [
            {
                path:'register', component:RegisterComponent, canActivate:[CheckRegisterLoginGuard]
            },
            {
                path:'login', component:LoginComponent, canActivate:[CheckRegisterLoginGuard]
            },
            {
                path:'user-details/:id', component:UserDetailsComponent
            },
            {
                path:'user-panel', 
                loadChildren: ()=>import('./module/panel/panel.module').then(m=>m.UserPanelModule), 
                canActivate:[UserLoggedInGuard]
            },
            { path:'**', redirectTo:'' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
