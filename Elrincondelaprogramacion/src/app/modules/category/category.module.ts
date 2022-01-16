import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LastAddedCategoryComponent } from './component/last-added-category/last-added-category.component';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';


@NgModule({
    declarations: [
        LastAddedCategoryComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FlashMessagesModule.forRoot()
    ],
    exports:[
        LastAddedCategoryComponent
    ]
})
export class CategoryModule { }
