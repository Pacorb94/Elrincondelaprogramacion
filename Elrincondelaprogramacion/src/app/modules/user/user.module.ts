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
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { MomentModule } from 'angular2-moment';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
    declarations: [
        RegisterComponent,
        LoginComponent,
        UserDetailsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FlashMessagesModule.forRoot(),
        UserRoutingModule,
        MomentModule,
        DataTablesModule
    ],
    providers:[
        CheckRegisterLoginGuard, 
        UserLoggedInGuard
    ]
})
export class UserModule { }
