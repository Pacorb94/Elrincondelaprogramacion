import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpRequestInterceptor } from './interceptor/HttpRequestIncerceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { MyFooterComponent } from './components/my-footer/my-footer.component';
import { PostModule } from './modules/post/post.module';
import { NgcCookieConsentModule } from 'ngx-cookieconsent';
import { cookieConfig } from './cookie.conf';
import { CookiesPolicyComponent } from './components/cookies-policy/cookies-policy.component';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        MyFooterComponent,
        CookiesPolicyComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        //Para que funcionen los componentes de este módulo debemos importar el módulo
        PostModule,
        ReactiveFormsModule,
        HttpClientModule,
        MomentModule,
        NgcCookieConsentModule.forRoot(cookieConfig)
    ],
    providers: [
        [{ provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }]
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }