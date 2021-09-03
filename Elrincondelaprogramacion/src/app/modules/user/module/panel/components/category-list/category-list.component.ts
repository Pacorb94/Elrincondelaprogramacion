import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { CategoryService } from '../../../../../category/service/category.service';
import { UserService } from 'src/app/modules/user/service/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';


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

    constructor(private _categoryService:CategoryService, private _userService:UserService,
    private _flashMessagesService:FlashMessagesService) {
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
        //Si el ancho de la pantalla es menor o igual a 575
        if (window.outerWidth<=parseInt('575')) window.scroll(0, 550);
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
                    //Si el ancho de la pantalla es menor o igual a 575
                    window.outerWidth<=parseInt('575')?window.scroll(0, 600):window.scroll(0, 50);                 
                    this.showFlashMessage('Has borrado la categoría',
                        'alert alert-success col-md-5 mt-3 mx-auto text-center', 3000);           
                }        
            },
            error=>{
                window.outerWidth<=parseInt('575')?window.scroll(0, 600):window.scroll(0, 50); 
                this.showFlashMessage('No has borrado la categoría',
                    'alert alert-danger col-md-5 mt-3 mx-auto text-center', 3000);
            }
        );
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