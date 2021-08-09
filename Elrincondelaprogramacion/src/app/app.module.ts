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
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        FooterComponent
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
