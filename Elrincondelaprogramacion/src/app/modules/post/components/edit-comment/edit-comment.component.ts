import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommentService } from './../../services/comment.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
    selector: 'edit-comment',
    templateUrl: './edit-comment.component.html',
    styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit, OnDestroy {
    @Input() comment:any;
    @Input() user:any;
    form:FormGroup;
    updateCommentSubscription:Subscription;

    constructor(private _commentService:CommentService, 
    private _flashMessagesService: FlashMessagesService) {
        this.form=new FormGroup({
            content:new FormControl('', Validators.required)
        });
        this.updateCommentSubscription=new Subscription();
    }

    ngOnInit(){
        this.setFormValue();
    }

    ngOnDestroy(){
        this.updateCommentSubscription.unsubscribe();
    }
    
    /**
     * Función que establece el valor del campo del formulario
     */
    setFormValue(){
        this.form.get('content')?.setValue(this.comment.content);
    }

    /**
     * Función que modifica un comentario
     */
    update(){    
        this.setCommentFormValues();
        this.updateCommentSubscription=this._commentService.update(this.comment).subscribe(
            response=>{
                if (response) {
                    this._commentService.setUpdatedCommentList$(true);
                    //Desplazamos la ventana
                    window.scrollTo(0, 400);
                    this.showFlashMessage('Has modificado el comentario',
                        'alert alert-success col-md-7 text-center mx-auto', 3000);
                }
            },
            error=>{
                //Desplazamos la ventana
                window.scrollTo(0, 400);
                this.showFlashMessage('No has modificado el comentario',
                    'alert alert-danger col-md-7 text-center mx-auto', 3000);
            }
        );
    }

    /**
     * Función que da los valores del formulario al comentario
     */
    setCommentFormValues(){
        //Con ? evitamos que Angular muestre un mensaje de que el campo puede estar null
        if (this.form.get('content')?.value) this.comment.content=this.form.get('content')?.value;
    }

    /**
     * Función que comprueba si el foco está en el campo
     * @param field
     */
    checkTouched(field: any): boolean {
        if (field.touched) return true;
        return false;
    }

    /**
     * Función que muestra un mensaje de validación incorrecta
     * @param field 
     * @param fieldName 
     */
    wrongValidationMessage(field: any, fieldName: string): string {
        let message='';
        if (field.errors?.required) message=`El campo ${fieldName} es obligatorio`;
        return message;
    }

    /**
     * Función que muestra un mensaje flash
     * @param message
     * @param cssClass
     * @param timeout
     */
    showFlashMessage(message: string, cssClass: string, timeout: number) {
        this._flashMessagesService.show(message,
            {
                cssClass: cssClass,
                timeout: timeout
            }
        );
    }
}
