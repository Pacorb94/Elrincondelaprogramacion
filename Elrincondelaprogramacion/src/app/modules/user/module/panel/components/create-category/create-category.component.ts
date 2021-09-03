import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { CategoryService } from '../../../../../category/service/category.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'create-category',
    templateUrl: './create-category.component.html',
    styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit, OnDestroy {
    category:Category;
    goodCreate:boolean;
    form:FormGroup;
    createSubscription:Subscription;

    constructor(private _categoryService:CategoryService, 
    private _flashMessagesService:FlashMessagesService) {     
        this.category=new Category(null, '');
        this.goodCreate=false;
        this.goodCreate=false;
        this.form=new FormGroup({
            name:new FormControl('', Validators.required),      
        });
        this.createSubscription=new Subscription();
    }

    ngOnInit(){
        //Si el ancho de la pantalla es menor o igual a 575
        if (window.outerWidth<=parseInt('575')) window.scroll(0, 550);
    }

    ngOnDestroy(){
        this.createSubscription.unsubscribe();
    }

    /**
     * Función que crea la categoría
     */
    create(){
        this.setCategoryFormValue();
        this.createSubscription=this._categoryService.create(this.category).subscribe(
            response=>{
                if (response) {
                    this.goodCreate=true;
                    //Si el ancho de la pantalla es menor o igual a 575
                    if(window.outerWidth<=parseInt('575')) window.scroll(0, 600);                  
                    this._categoryService.setLastAddedCategory$(this.category);
                }else{
                    this.goodCreate=false;
                }
            },
            error=>{
                this.goodCreate=false;
                if(window.outerWidth<=parseInt('575')) window.scroll(0, 600);
                this.showFlashMessage('No has creado la categoría',
                    'alert alert-danger col-md-5 mt-3 mx-auto', 1500);
            }
        );
    }

    /**
     * Función que da el valor del formulario a la categoría
     */
    setCategoryFormValue(){
        //Con ? evitamos que Angular muestra un mensaje de que el campo puede estar null
        this.category.setName(this.form.get('name')?.value);
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
