import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Commentt } from './../../../../models/Commentt';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommentService } from '../../../post/services/comment.service';
import { UserService } from './../../../user/service/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'create-comment',
    templateUrl: './create-comment.component.html',
    styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit, OnDestroy {
    @Input()post:any;
    user:any;
    //!indica que aunque tenga tipo no es obligatorio inicializar la variable
    comment!:Commentt;
    form:FormGroup;
    createCommentSubscription:Subscription;

    constructor(private _userService:UserService, private _commentService:CommentService, 
    private _flashMessagesService:FlashMessagesService) { 
        this.user=this._userService.getUserLoggedIn();
        this.form=new FormGroup({
            content:new FormControl('', Validators.required)
        });
        this.createCommentSubscription=new Subscription();
    }
    
    ngOnInit(){
        //Inicializamos aquí debido a que this.post no tiene valor hasta que se inicie el componente
        this.comment=new Commentt(null, '', this.user.id, this.post.id, false);
    }

    ngOnDestroy(){
        this.createCommentSubscription.unsubscribe();
    }
    
    /**
     * Función que crea un comentario
     */
    createComment(){
        this.setCommentFormValues();
        this.createCommentSubscription=this._commentService.create(this.post.id, this.comment)
            .subscribe(
                response=>{
                    if (response) {
                        this.showFlashMessage('Has creado el comentario correctamente',
                            'alert alert-success col-md-10 mt-3 mx-auto text-center', 1500);
                        this._commentService.setUpdatedCommentList$(true);
                    }else{
                        this.showFlashMessage('No has creado el comentario correctamente',
                            'alert alert-danger col-md-10 mt-3 mx-auto text-center', 1500);
                    }
                },
                error=>{
                    this.showFlashMessage('No has creado el comentario correctamente',
                        'alert alert-danger col-md-10 mt-3 mx-auto text-center', 1500);
                }
            );
    }

    /**
     * Función que da los valores del formulario al comentario
     */
    setCommentFormValues(){
        //Con ? evitamos que Angular muestra un mensaje de que el campo puede estar null
        this.comment.setContent(this.form.get('content')?.value);
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
        if (field.errors?.required)`El campo ${fieldName} es obligatorio`;
        return '';
    }
}
