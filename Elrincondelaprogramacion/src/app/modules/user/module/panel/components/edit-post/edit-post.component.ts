import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../../service/user.service';
import { PostService } from '../../../../../post/services/post.service';
import { CategoryService } from '../../../../../category/service/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'edit-post',
    templateUrl: './edit-post.component.html',
    styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {
    pageTitle:string;
    post:any;
    categories:any[];
    form:FormGroup;
    goodEdit:boolean;
    postSubscription:Subscription;
    categoriesSubscription:Subscription;
    updateSubscription:Subscription;

    constructor(private _userService:UserService, private _postService:PostService, 
    private _categoryService:CategoryService , private _route:ActivatedRoute, private _router:Router,
    private _flashMessagesService:FlashMessagesService) {
        this.pageTitle='Editar post';      
        this.categories=[];
        this.form=new FormGroup({
            title:new FormControl('', Validators.required),
            content:new FormControl('', Validators.required),
            category:new FormControl('')
        });
        this.goodEdit=false;
        this.postSubscription=new Subscription();
        this.categoriesSubscription=new Subscription();
        this.updateSubscription=new Subscription();
    }

    ngOnInit(){
        //Si el tamaño de la ventana es menor o igual a 575
        if (window.outerWidth<=parseInt('575')) window.scroll(0, 550);
        this.getCategories();
        this.getRoutePost();
    }

    ngOnDestroy(){
        this.postSubscription.unsubscribe();
        this.categoriesSubscription.unsubscribe();
        this.updateSubscription.unsubscribe();
    }

    /**
     * Función que obtiene el post de la ruta
     */
    getRoutePost(){
        this._route.params.subscribe(
            params=>{
                if (params['title']) {
                    let postTitle=params['title'];
                    this.getPost(postTitle);
                }else{
                    this._router.navigate(['']);
                }
            }
        );
    }

    /**
     * Función que obtiene un post
     * @param title
     */
    getPost(title:string){
        this.postSubscription=this._postService.getPost(title).subscribe(
            response=>{
                if (response) {
                    let user=this._userService.getUserLoggedIn();
                    //Si el post es del usuario que lo va a modificar
                    if (response.user.id==user.id) {
                        this.post=response;
                        this.setFormValues();
                    }else{
                        this._router.navigate(['']);
                    }                   
                }       
            },
            error=>{
                this._router.navigate(['']);
            }
        );
    }
    
    /**
     * Función que establece los valores de los campos del formulario
     */
    setFormValues(){
        this.form.get('title')?.setValue(this.post.title);
        this.form.get('content')?.setValue(this.post.content);   
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
     * Función que actualiza el post
     */
    update(){
        this.setPostFormValues();
        this.updateSubscription=this._postService.update(this.post).subscribe(
            response=>{
                if (response) {
                    this.goodEdit=true;
                    this.post=response;
                    //Si el tamaño de la ventana es menor o igual a 575
                    window.outerWidth<=parseInt('575')?window.scroll(0, 550):window.scroll(0, 50);
                }else{
                    this.goodEdit=false;
                }
            },
            error=>{
                window.outerWidth<=parseInt('575')?window.scroll(0, 550):window.scroll(0, 50);
                this.showFlashMessage('No has editado el post',
                    'alert alert-danger col-md-5 mt-3 mx-auto', 1500);
            }
        );
    }

    /**
     * Función que da los valores del formulario al post
     */
    setPostFormValues(){
        //Con ? evitamos que Angular muestre un mensaje de que el campo puede estar null
        if (this.form.get('title')?.value) this.post.title=this.form.get('title')?.value;
        if (this.form.get('content')?.value) this.post.content=this.form.get('content')?.value;
        if (this.form.get('category')?.value) this.post.category=this.form.get('category')?.value;
        if (localStorage.hasOwnProperty('postImage')) {
            this.post.image=localStorage.getItem('postImage')??'';
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
