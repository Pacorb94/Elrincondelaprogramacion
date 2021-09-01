import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { MostActivePostsComponent } from './components/most-active-posts/most-active-posts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpRequestInterceptor } from './interceptor/HttpRequestIncerceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { MyFooterComponent } from './components/my-footer/my-footer.component';
import { NgcCookieConsentModule } from 'ngx-cookieconsent';
import { cookieConfig } from './cookie.conf';
import { CookiesPolicyComponent } from './components/cookies-policy/cookies-policy.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { PostModule } from './modules/post/post.module';
import { CategoryModule } from './modules/category/category.module';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        MostActivePostsComponent,
        MyFooterComponent,
        CookiesPolicyComponent
    ],
    //Para que funcionen los componentes de otros módulos debemos importar el módulo
    imports: [
        BrowserModule,
        AppRoutingModule,
        CategoryModule,
        ReactiveFormsModule,
        HttpClientModule,
        MomentModule,
        NgcCookieConsentModule.forRoot(cookieConfig),
        FlashMessagesModule.forRoot()
    ],
    providers: [
        [{ provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }]
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }