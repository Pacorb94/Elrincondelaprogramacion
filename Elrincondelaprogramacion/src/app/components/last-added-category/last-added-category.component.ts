import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from './../../services/category.service';
import { UserService } from './../../module/user/service/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
    selector: 'last-added-category',
    templateUrl: './last-added-category.component.html',
    styleUrls: ['./last-added-category.component.scss']
})
export class LastAddedCategoryComponent implements OnInit, OnDestroy {
    category:any;
    user:any
    subscription:Subscription;

    constructor(private _categoryService:CategoryService, private _userService:UserService,
    private _flashMessagesService:FlashMessagesService) { 
        this.user=this._userService.getUserLoggedIn();
        this.subscription=new Subscription();
    }

    ngOnInit(): void {
        this.getLastAddedCategory();
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
    
    /**
     * Función que obtiene la última categoría añadida
     */
    getLastAddedCategory(){
        this.subscription=this._categoryService.getLastAddedCategory$().subscribe(
            category=>{
                if (category&&(this.user.roles[0]=='ROLE_ADMIN'||this.user.roles[0]=='ROLE_WRITER')){
                    localStorage.setItem('lastAddedCategory', JSON.stringify(category));      
                }
                this.showCategoryOrDeleteIt();
            }
        ); 
    }
    
    /**
     * Función que muestra un mensaje en función de la fecha
     */
    showCategoryOrDeleteIt(){
        if (localStorage.hasOwnProperty('lastAddedCategory')) {
            this.category=JSON.parse(localStorage.getItem('lastAddedCategory')??'');
            let today=new Date();
            let categoryDate=new Date(this.category.createdAt);
            //Sumamos 1 semana a la fecha de la creación de la categoría
            let oneWeek=new Date(categoryDate.setDate(categoryDate.getDate()+7));
            //Si coincide el dia, mes y año de la fecha actual con la de la categoría
            if (today.getDate()==oneWeek.getDate()&&today.getMonth()&&oneWeek.getMonth()
            &&today.getFullYear()&&oneWeek.getFullYear()) {      
                this.category=null;
                localStorage.removeItem('lastAddedCategory');
            }else{
                this.showFlashMessage(`¡Nueva categoría! ${this.category.name}`,
                'alert alert-success col-md-4 mx-auto text-center', 3000);
            }
        }
    }

    /**
     * Función que muestra un mensaje flash
     * @param message
     * @param cssClass
     * @param timeout
     */
    showFlashMessage(message:string, cssClass:string, timeout:number){
        this._flashMessagesService.show(message,
            {
                cssClass:cssClass,
                timeout:timeout
            }
        );
    }
}