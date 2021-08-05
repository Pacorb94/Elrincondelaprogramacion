import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPanelRoutingModule } from './panel-routing.module';
import { MainComponent } from './components/main/main.component';
import { UpdateComponent } from './components/update/update.component';
import { AngularFileUploaderModule } from 'angular-file-uploader';

@NgModule({
    declarations: [
        MainComponent,
        UpdateComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FlashMessagesModule.forRoot(),
        UserPanelRoutingModule,
        AngularFileUploaderModule
    ]
})
export class UserPanelModule { }
