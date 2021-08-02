import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPanelRoutingModule } from './user-panel-routing.module';
import { MainComponent } from './main/main.component';


@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FlashMessagesModule.forRoot(),
        UserPanelRoutingModule
    ]
})
export class UserPanelModule { }
