import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

//Definimos las rutas
const routes: Routes = [
    { path:'', component:HomeComponent },
    //Cargamos una ruta padre que tendrá rutas hijas con lo cual usará el lazyLoading
    { path:'', loadChildren:()=>import('./modules/user/user.module').then(m=>m.UserModule) },
    { path:'', loadChildren:()=>import('./modules/post/post.module').then(m=>m.PostModule) },
    { path:'**', redirectTo:''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
