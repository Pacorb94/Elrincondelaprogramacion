import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
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
    ]
})
export class UserModule { }
