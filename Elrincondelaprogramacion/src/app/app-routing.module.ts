import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostRoutingModule } from './modules/post/post-routing.module';
import { CookiesPolicyComponent } from './components/cookies-policy/cookies-policy.component';


const routes: Routes = [
    { path:'', component:HomeComponent },
    { path:'cookies-policy', component:CookiesPolicyComponent },
    //Cargamos una ruta padre que tendrá rutas hijas con lo cual usará el lazyLoading
    { path:'', loadChildren:()=>import('./modules/user/user.module').then(m=>m.UserModule) },
    { path:'**', redirectTo:''}
];


@NgModule({
    imports: [
        /*Cada vez que se pulse en un ancla nos llevará suavemente 
        hacia la parte superior de la pantalla*/
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'top'
        }),
        //Para que funcionen las rutas de este módulo debemos importarlas
        PostRoutingModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
