import { UserLoggedInGuard } from './guards/user-logged-in.guard';
import { CheckRegisterLoginGuard } from './guards/check-register-login.guard';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        RegisterComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FlashMessagesModule.forRoot(),
        UserRoutingModule
    ],
    providers:[
        CheckRegisterLoginGuard, 
        UserLoggedInGuard
    ]
})
export class UserModule { }
