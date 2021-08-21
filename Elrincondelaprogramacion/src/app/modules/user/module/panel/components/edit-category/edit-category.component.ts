import { Category } from '../../../../../../models/Category';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../../../../category/service/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
    pageTitle:string;
    category:any;
    form:FormGroup;
    goodEdit:boolean;
    categorySubscription:Subscription;
    updateSubscription:Subscription;

    constructor(private _categoryService:CategoryService , private _route:ActivatedRoute, 
    private _router:Router, private _flashMessagesService:FlashMessagesService) {
        this.pageTitle='Editar categoría';      
        this.form=new FormGroup({
            name:new FormControl('', Validators.required)
        });
        this.goodEdit=false;
        this.categorySubscription=new Subscription();
        this.updateSubscription=new Subscription();
    }

    ngOnInit(){
        this.getRouteCategory();
    }

    ngOnDestroy(){
        this.categorySubscription.unsubscribe();
        this.updateSubscription.unsubscribe();
    }

    /**
     * Función que obtiene la categoría de la ruta
     */
    getRouteCategory(){
        this._route.params.subscribe(
            params=>{
                if (params['name']) {
                    let categoryName=params['name'];
                    this.getCategory(categoryName);
                }else{
                    this._router.navigate(['']);
                }
            }
        );
    }

    /**
     * Función que obtiene una categoría
     * @param name
     */
    getCategory(name:string){
        this.categorySubscription=this._categoryService.getCategory(name).subscribe(
            response=>{
                if (response) {
                    this.category=response;
                    this.setFormValues(this.category);                             
                }else{
                    this._router.navigate(['']);
                }        
            },
            error=>{
                this._router.navigate(['']);
            }
        );
    }

    /**
     * Función que actualiza la categoría
     */
    update(){
        this.setCategoryFormValues();
        this.updateSubscription=this._categoryService.update(this.category).subscribe(
            response=>{
                if (response) {
                    this.goodEdit=true;
                    this.category=response;
                }else{
                    this.showFlashMessage('No has editado la categoría correctamente',
                        'alert alert-danger col-md-5 mt-3 mx-auto', 1500);
                }
            },
            error=>{
                this.showFlashMessage('No has editado la categoría correctamente',
                    'alert alert-danger col-md-5 mt-3 mx-auto', 1500);
            }
        );
    }

    /**
     * Función que da los valores del formulario a la categoría
     */
    setCategoryFormValues(){
        //Con ? evitamos que Angular muestre un mensaje de que el campo puede estar null
        if (this.form.get('name')?.value) this.category.name=this.form.get('name')?.value;
    }

    /**
     * Función que establece los valores del formulario
     * @param category 
     */
    setFormValues(category:any){
        this.form.get('name')?.setValue(category.name);
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

    /**
     * Función que comprueba si el foco está en el campo
     * @param field
     */
    checkTouched(field:any):boolean{
        if (field.touched) return true;
        return false;
    }

    /**
     * Función que muestra un mensaje de validación incorrecta
     * @param field 
     * @param fieldName 
     */
    wrongValidationMessage(field:any, fieldName:string) {
        let message='';
        if (field.errors?.required) message=`El campo ${fieldName} es obligatorio`;         
        return message;
    }
}
