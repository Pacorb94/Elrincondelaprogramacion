import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CookiesPolicyComponent } from './components/cookies-policy/cookies-policy.component';

const routes: Routes = [
    { path:'', component:HomeComponent },
    //Cargamos las rutas hijas por lazyloading
    { path:'posts', loadChildren:()=>import('./modules/post/post.module').then(m=>m.PostModule) },
    { path:'page/:page', component:HomeComponent },
    { path:'', loadChildren:()=>import('./modules/user/user.module').then(m=>m.UserModule) },
    { path:'cookies-policy', component:CookiesPolicyComponent },
    { path:'**', redirectTo:''}
];

@NgModule({
    //Para que funcionen las rutas de otros módulos debemos importarlas
    imports: [
        /*Cada vez que se pulse en un ancla nos llevará suavemente 
        hacia la parte superior de la pantalla*/
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'top',
            anchorScrolling: 'enabled'        
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
