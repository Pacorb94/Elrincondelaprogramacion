import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { CategoryService } from '../../../../../category/service/category.service';
import { UserService } from 'src/app/modules/user/service/user.service';

@Component({
    selector: 'category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {
    categories:any[]; 
    user:any;
    loading:boolean;
    noCategories:any;
    categoriesSubscription:Subscription;
    deleteSubscription:Subscription;
    //-----Tabla------
    dtOptions:DataTables.Settings;
    dtTrigger:Subject<any>;

    constructor(private _categoryService:CategoryService, private _userService:UserService) {
        this.categories=[];
        this.user=this._userService.getUserLoggedIn();
        this.loading=true;
        this.categoriesSubscription=new Subscription();
        this.deleteSubscription=new Subscription();
        this.dtOptions={};
        this.dtTrigger=new Subject<any>();
    }

    ngOnInit(): void {
        this.dtOptions = {
            pagingType:'full_numbers',
            pageLength:5,
            language:{url:'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'},
            order:[]
        };
        this.getCategories();
    }

    ngOnDestroy(){
        this.categoriesSubscription.unsubscribe();
        this.deleteSubscription.unsubscribe();
        this.dtTrigger.unsubscribe();
    }

    /**
     * Función que obtiene las categorías
     * @param refreshTable
     */
    getCategories(refreshTable:boolean=false){
        this.categoriesSubscription=this._categoryService.getCategories().subscribe(
            response=>{
                if (response.length>0) {
                    this.categories=response;
                    this.noCategories=false;
                    this.loading=false;
                    /*Según el plugin de DataTable debemos elegir cuándo refrescar los datos
                    de la tabla*/
                    if (!refreshTable) this.dtTrigger.next();      
                } else{
                    this.loading=true;
                    this.noCategories=true;
                }         
            },
            error=>{}
        );
    }

    /**
     * Función que borra una categoría
     * @param id
     */
    deleteCategory(id:number){
        this.deleteSubscription=this._categoryService.delete(id).subscribe(
            response=>{
                if (response) {
                    this.getCategories(true);   
                    this.noCategories=true;            
                }        
            },
            error=>{}
        );
    }
}