import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostsFinderComponent } from './components/posts-finder/posts-finder.component';
import { CookiesPolicyComponent } from './components/cookies-policy/cookies-policy.component';


const routes: Routes = [
    { path:'', component:HomeComponent },
    { path:'search-posts/:text', component:PostsFinderComponent },
    //Cargamos las rutas hijas por lazyloading
    { path:'posts', loadChildren:()=>import('./modules/post/post.module').then(m=>m.PostModule) },
    { path:'page/:page', component:HomeComponent },
    { path:'', loadChildren:()=>import('./modules/user/user.module').then(m=>m.UserModule) },
    { path:'cookies-policy', component:CookiesPolicyComponent },
    { path:'**', redirectTo:'' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            /*Cada vez que se pulse en un ancla nos llevará suavemente 
            hacia la parte superior de la pantalla*/
            scrollPositionRestoration: 'top'   
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
