import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from './../../services/category.service';

@Component({
    selector: 'last-added-category',
    templateUrl: './last-added-category.component.html',
    styleUrls: ['./last-added-category.component.scss']
})
export class LastAddedCategoryComponent implements OnInit, OnDestroy {
    category:any;
    subscription:Subscription;

    constructor(private _categoryService:CategoryService) { 
        this.subscription=new Subscription();
    }

    ngOnInit(): void {
        this.getLastCreatedCategory();
      //  this.checkDates();
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
    
    getLastCreatedCategory(){
        this.subscription=this._categoryService.getLastAddedCategory$().subscribe(
            category=>{
                if (category) {
                    this.category=category;
                    let categoryDate=new Date(this.category.createdAt);
                    let categoryDatePlusOneWeek=new Date(categoryDate.setDate(categoryDate.getDate()+7));
                    localStorage.setItem('oneWeek', categoryDatePlusOneWeek.toString());                 
                }
                this.checkDates();
            }
        );
    }

    checkDates(){
        if (localStorage.hasOwnProperty('oneWeek')) {
            let oneWeek=new Date(localStorage.getItem('oneWeek')??'');
            if (+oneWeek===+new Date()) {
                console.log('iguales');
            }else{
                console.log('no iguales');
            }

        }
    }
}
