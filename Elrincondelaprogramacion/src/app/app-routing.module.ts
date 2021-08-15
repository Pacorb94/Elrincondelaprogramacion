import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';

const routes: Routes = [
    { path:'', component:HomeComponent },
    { path:'page/:page', component:PostsListComponent },
    //Cargamos una ruta padre que tendrá rutas hijas con lo cual usará el lazyLoading
    { path:'', loadChildren:()=>import('./modules/user/user.module').then(m=>m.UserModule) },
    { path:'**', redirectTo:''}
];

@NgModule({
    /*Cada vez que se pulse en un ancla nos llevará suavemente 
    hacia la parte superior de la pantalla*/
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'top'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
