import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UserService } from './modules/user/service/user.service';
import { PostService } from './services/post.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpRequestInterceptor } from './interceptor/HttpRequestIncerceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { MyFooterComponent } from './components/my-footer/my-footer.component';
import { MostActivePostsComponent } from './components/most-active-posts/most-active-posts.component';
import { LastAddedCategoriesComponent } from './components/last-added-categories/last-added-categories.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        MyFooterComponent,
        MostActivePostsComponent,
        LastAddedCategoriesComponent,
        MyFooterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        MomentModule,
        FlashMessagesModule.forRoot(),
    ],
    providers: [
        UserService,
        PostService,
        [{provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}]
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
