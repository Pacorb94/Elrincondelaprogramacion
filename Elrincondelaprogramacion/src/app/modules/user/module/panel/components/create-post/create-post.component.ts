import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../../service/user.service';
import { PostService } from '../../../../../post/services/post.service';
import { CategoryService } from '../../../../../category/service/category.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Post } from '../../../../../../models/Post';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit, OnDestroy {
    user:any;
    post:Post;
    goodCreate:boolean;
    categories:any[];
    form:FormGroup;
    categoriesSubscription:Subscription;
    createSubscription:Subscription;

    constructor(private _userService:UserService, private _postService:PostService, 
    private _categoryService:CategoryService, private _flashMessagesService:FlashMessagesService) {    
        this.user=this._userService.getUserLoggedIn();
        this.post=new Post(null, 0, '', '', this.user.id, '', false, null);
        this.goodCreate=false;
        this.categories=[];
        this.form=new FormGroup({
            title:new FormControl('', Validators.required),
            content:new FormControl('', Validators.required),
            category:new FormControl('', Validators.required)
        });
        this.categoriesSubscription=new Subscription();
        this.createSubscription=new Subscription();
    }

    ngOnInit(){
        //Si el tamaño de la ventana es menor o igual a 575
        if (window.outerWidth<=parseInt('575')) window.scroll(0, 550);
        this.getCategories();
    }

    ngOnDestroy(){
        this.categoriesSubscription.unsubscribe();
        this.createSubscription.unsubscribe();
    }

    /**
     * Función que obtiene las categorías
     */
    getCategories(){
        this.categoriesSubscription=this._categoryService.getCategories().subscribe(
            response=>{
                if (response) this.categories=response;            
            },
            error=>{}
        );
    }

    /**
     * Función que crea el post
     */
    create(){
        this.setPostFormValues();
        this.createSubscription=this._postService.create(this.post).subscribe(
            response=>{
                if (response) {
                    this.goodCreate=true;
                    //Si el tamaño de la ventana es menor o igual a 575
                    window.outerWidth<=parseInt('575')?window.scroll(0, 550):window.scroll(0, 50);               
                }else{
                    this.goodCreate=false;
                }
            },
            error=>{
                this.goodCreate=false;
                window.outerWidth<=parseInt('575')?window.scroll(0, 550):window.scroll(0, 50); 
                this.showFlashMessage('No has creado el post',
                    'alert alert-danger col-md-5 mt-3 mx-auto', 3000);
            }
        );
    }

    /**
     * Función que da los valores del formulario al post
     */
    setPostFormValues(){
        //Con ? evitamos que Angular muestre un mensaje de que el campo puede estar null
        this.post.setTitle(this.form.get('title')?.value);
        this.post.setContent(this.form.get('content')?.value);
        this.post.setCategoryId(this.form.get('category')?.value);
        if (localStorage.hasOwnProperty('postImage')) {
            this.post.setImage(localStorage.getItem('postImage')??'');
            localStorage.removeItem('postImage');
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
