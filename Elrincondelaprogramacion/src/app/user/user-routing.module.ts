import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CheckRegisterLoginGuard } from './../guards/check-register-login.guard';


const routes: Routes = [
    {
        //Este path está vacío porque vendrá de la ruta padre (app-routing.module.ts)
        path:'', 
        children: [
            {
                path: 'register', component:RegisterComponent, canActivate:[CheckRegisterLoginGuard]
            },
            {
                path: 'login', component:LoginComponent, canActivate:[CheckRegisterLoginGuard]
            },
            {
                path: '**', redirectTo:''
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
