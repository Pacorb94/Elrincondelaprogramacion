import { Component, OnDestroy } from '@angular/core';
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
export class CreateCategoryComponent implements OnDestroy {
    pageTitle:string;
    category:Category;
    goodCreate:boolean;
    form:FormGroup;
    createSubscription:Subscription;

    constructor(private _categoryService:CategoryService, 
    private _flashMessagesService:FlashMessagesService) { 
        this.pageTitle='Crear categoría';      
        this.category=new Category(null, '');
        this.goodCreate=false;
        this.goodCreate=false;
        this.form=new FormGroup({
            name:new FormControl('', Validators.required),      
        });
        this.createSubscription=new Subscription();
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
                    this._categoryService.setLastAddedCategory$(this.category);
                }else{
                    this.goodCreate=false;
                }
            },
            error=>{
                this.goodCreate=false;
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
