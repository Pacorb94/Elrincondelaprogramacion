import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchPostComponent } from './components/watch-post/watch-post.component';
import { HomeComponent } from './../../components/home/home.component';

const routes: Routes = [
    { 
        path:'', 
        children:[
            { path:':title', component:WatchPostComponent },
            { path:':title/page/:page', component:WatchPostComponent },
            { path:'categories/:name', component:HomeComponent },
            { path:'categories/:name/page/:page', component:HomeComponent },
            { path:'**', redirectTo:''}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostRoutingModule { }
