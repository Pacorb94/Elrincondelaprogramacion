import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { CategoryService } from './../../../../../category/service/category.service';
import { Router } from '@angular/router';

@Component({
    selector: 'category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {
    categories:any[]; 
    loading:boolean;
    categoriesSubscription:Subscription;
    deleteSubscription:Subscription;
    //-----Tabla------
    dtOptions:DataTables.Settings;
    dtTrigger:Subject<any>;

    constructor(private _categoryService:CategoryService, private _router:Router) {
        this.categories=[];
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
            language:{url:'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'}
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
                    this.loading=false;
                    /*Según el plugin de DataTable debemos elegir cuándo refrescar los datos
                    de la tabla*/
                    if (!refreshTable) this.dtTrigger.next();      
                }           
            },
            error=>{}
        );
    }

    /**
     * Función que borra una categoría
     * @param name
     */
    deleteCategory(name:string){
        this.deleteSubscription=this._categoryService.delete(name).subscribe(
            response=>{
                if (response) {
                    this.getCategories(true);               
                }else{
                    this._router.navigate(['/user-panel/category-list']);
                }         
            },
            error=>{
                this._router.navigate(['/user-panel/category-list']);
            }
        );
    }
}