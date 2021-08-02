import { UserService } from './services/user.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        MomentModule,
        FlashMessagesModule.forRoot()
    ],
    providers: [UserService],
    bootstrap: [AppComponent]
})
export class AppModule {}
