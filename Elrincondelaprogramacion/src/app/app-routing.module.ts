import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CookiesPolicyComponent } from './components/cookies-policy/cookies-policy.component';
import { WatchPostComponent } from './components/watch-post/watch-post.component';


const routes: Routes = [
    { path:'', component:HomeComponent },
    { path:'page/:page', component:HomeComponent },
    { 
        path:'posts', 
        children:[
            { path:':title', component:WatchPostComponent },
            { path:'categories/:name', component:HomeComponent},
            { path:'categories/:name/page/:page', component:HomeComponent },
        ]
    },
    { path:'cookies-policy', component:CookiesPolicyComponent },
    //Cargamos una ruta padre que tendrá rutas hijas con lo cual usará el lazyLoading
    { path:'', loadChildren:()=>import('./module/user/user.module').then(m=>m.UserModule) },
    { path:'**', redirectTo:''}
];


@NgModule({
    //Para que funcionen las rutas de otros módulos debemos importarlas
    imports: [
        /*Cada vez que se pulse en un ancla nos llevará suavemente 
        hacia la parte superior de la pantalla*/
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'top'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
