import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../../../../service/user.service';
import { PostService } from '../../../../../post/service/post.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Post } from './../../../../../../models/Post';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnDestroy {
    pageTitle:string;
    user:any;
    post:Post;
    goodCreate:boolean;
    form:FormGroup;
    subscription:Subscription;

    constructor(private _userService:UserService, private _postService:PostService, 
    private _router:Router, private _flashMessagesService:FlashMessagesService) {
        this.pageTitle='Crear post';      
        this.user=this._userService.getUserLoggedIn();
        this.post=new Post(null, 2, '', '', this.user.id, '', false, null);
        this.goodCreate=false;
        this.form=new FormGroup({
            title:new FormControl('', Validators.required),
            content:new FormControl('', Validators.required),
            category:new FormControl('')
        });
        this.subscription=new Subscription();
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

    /**
     * Función que crea el post
     */
    create(){
        this.setPostFormValues();
        this.subscription=this._postService.create(this.post).subscribe(
            response=>{
                if (response) {
                    this.goodCreate=true;
                }else{
                    this.goodCreate=false;
                    this.showFlashMessage('No has creado el post correctamente',
                        'alert alert-danger col-md-3 mt-3 mx-auto', 1500);
                }
            },
            error=>{
                this.goodCreate=false;
                this.showFlashMessage('No has creado el post correctamente',
                    'alert alert-danger col-md-3 mt-3 mx-auto', 1500);
            }
        );
    }

    /**
     * Función que da los valores del formulario al post
     */
    setPostFormValues(){
        //Con ? evitamos que Angular muestra un mensaje de que el campo puede estar null
        this.post.setTitle(this.form.get('title')?.value);
        this.post.setContent(this.form.get('content')?.value);
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
