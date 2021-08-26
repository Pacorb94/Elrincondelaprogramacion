import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../../user/service/user.service';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'comment-list',
    templateUrl: './comment-list.component.html',
    styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit, OnDestroy {
    @Input()post:any;
    comments!:any[];
    user:any;
    profileImageUrl:string;
    form:FormGroup;
    updateCommentListSubscription:Subscription;
    getPostCommentsSubscription:Subscription;
    updateCommentSubscription:Subscription;
    deleteCommentSubscription:Subscription;
    //------Paginación-------
    page: any;
    prevPage: number;
    nextPage: number;
    totalPages: number[];

    constructor(private _userService:UserService, private _postService:PostService,
    private _commentService:CommentService, private _route: ActivatedRoute,
    private _flashMessagesService: FlashMessagesService) {   
        this.user=this._userService.getUserLoggedIn();
        this.profileImageUrl=`${environment.url}/profile-images/`;
        this.form=new FormGroup({
            content:new FormControl('', Validators.required)
        });
        this.updateCommentListSubscription=new Subscription();
        this.getPostCommentsSubscription=new Subscription();
        this.updateCommentSubscription=new Subscription();
        this.deleteCommentSubscription=new Subscription();
        this.prevPage = 0;
        this.nextPage = 0;
        this.totalPages = [];
    }

    ngOnInit(): void {
        this.getRouteParams();
    }

    ngOnDestroy(){
        this.updateCommentListSubscription.unsubscribe();
        this.getPostCommentsSubscription.unsubscribe();
        this.updateCommentSubscription.unsubscribe();
        this.deleteCommentSubscription.unsubscribe();
    }

    /**
     * Función que obtiene los parámetros de la ruta
     */
    getRouteParams() {
        this._route.params.subscribe(
            params => {
                this.page = params['page'];
                //Si tiene valor y es un número sino será el por defecto
                if (this.page && this.page.match(/[\d]+/)) {
                    this.page = Number.parseInt(this.page);
                } else {
                    this.page = 1;
                    this.prevPage = 1;
                    this.nextPage = 2;
                }
                this.getPostComments();
                this.updateCommentList();                     
            }
        );
    }
    
    /**
     * Función que obtiene los comentarios de un post
     */
    getPostComments(){
        this.getPostCommentsSubscription=this._postService
            .getPostComments(this.page, this.post.id).subscribe(
                response=>{
                    if (response.Comments.length) {
                        this.comments=response.Comments;
                        this.pagination(response.totalPages);
                    }                   
                },
                error=>{}
            );              
    }

    /**
     * Función que actualiza la lista de comentarios si hay un nuevo o se ha editado
     */
    updateCommentList(){
        this.updateCommentListSubscription=this._commentService.getUpdatedCommentList$().subscribe(
            updateCommentList=>{
                if (updateCommentList) this.getPostComments();         
            }
        );
    }

    /**
     * Función que hace la paginación
     * @param totalPages
     */
    pagination(totalPages: any) {
        //Reiniciamos la variable
        this.totalPages = [];
        for (let page = 1; page <= totalPages; page++) this.totalPages.push(page);
        /*Si la página actual es la 2 o más, la página anterior será 1 menos a 
        la actual sino será la 1*/
        if (this.page >= 2) {
            this.prevPage = this.page - 1;
        } else {
            this.prevPage = 1;
        }
        /*Si la página actual es menor al total de páginas, la página siguiente será 
        la actual más 1 sino la página siguiente será la última*/
        if (this.page < totalPages) {
            this.nextPage = this.page + 1;
        } else {
            this.nextPage = totalPages;
        }
    }
    
    /**
     * Función que muestra el formulario para modificar un comentario
     * @param commentContent 
     */
    showUpdateForm(commentContent:string){
        this.form.get('content')?.setValue(commentContent);
        console.log(this.form);
    }
    
    /**
     * Función que modifica un comentario
     * @param id 
     */
    update(id:number){
        this.updateCommentSubscription=this._commentService.update(id).subscribe(
            response=>{
                if (response) {
                    this.getPostComments();
                }else{

                }
            },
            error=>{

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
        let message='';
        if (field.errors?.required) message=`El campo ${fieldName} es obligatorio`;
        return message;
    }
    
    /**
     * Función que borra un comentario
     * @param id 
     */
    delete(id:number){
        this.deleteCommentSubscription=this._commentService.delete(id).subscribe(
            response=>{
                if (response) {
                    this.getPostComments();
                    //Desplazamos la ventana
                    window.scrollTo(0, 600);
                    this.showFlashMessage('Has borrado el comentario',
                        'alert alert-success col-md-7 text-center mx-auto', 3000);
                }else{
                    this.showFlashMessage('No has borrado el comentario',
                        'alert alert-danger col-md-7 text-center mx-auto', 3000);
                }
            },
            error=>{
                this.showFlashMessage('No has borrado el comentario',
                    'alert alert-danger col-md-7 text-center mx-auto', 3000);
            }
        );
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
