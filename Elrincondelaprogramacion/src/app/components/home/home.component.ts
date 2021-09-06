import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../../modules/post/services/post.service';
import { UserService } from 'src/app/modules/user/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
    pageTitle: string;
    userLoggedIn:any;
    posts: any[];
    category: any;
    loading: boolean;
    imageUrl:string;
    noPosts:any;
    roleChanged:boolean;
    postsSubscription:Subscription;
    userSubscription:Subscription;
    //------Paginación-------
    page: any;
    prevPage: number;
    nextPage: number;
    totalPages: number[];

    constructor(private _postService: PostService, private _userService:UserService, 
    private _route: ActivatedRoute, private ccService: NgcCookieConsentService) { 
        this.pageTitle = 'Posts';
        this.posts=[];
        this.loading = true;
        this.imageUrl=`${environment.url}/posts-images/`;
        this.roleChanged=false;
        this.postsSubscription=new Subscription();
        this.userSubscription=new Subscription();
        this.prevPage = 0;
        this.nextPage = 0;
        this.totalPages = [];
    }

    ngOnInit(): void {
        this.checkUserLoggedIn();
        this.getRouteParams();
        this.checkRoleChanged();
    }

    ngOnDestroy(){
        this.postsSubscription.unsubscribe();
        this.userSubscription.unsubscribe();
    }
    
    /**
     * Función que comprueba si el usuario ha iniciado sesión
     */
    checkUserLoggedIn(){
        this._userService.getUserLoggedIn$().subscribe(
            user=>{
                if (user) {
                    this.userLoggedIn=user;
                }else{
                    this.userLoggedIn=null;
                }
            }
        );
    }

    /**
     * Función que obtiene los parámetros de la ruta
     */
    getRouteParams() {
        this._route.params.subscribe(
            params => {
                this.page = params['page'];
                this.category=params['name'];
                //Si tiene valor y es un número sino será el por defecto
                if (this.page && this.page.match(/[\d]+/)) {
                    this.page = Number.parseInt(this.page);
                } else {
                    this.page = 1;
                    this.prevPage = 1;
                    this.nextPage = 2;
                }
                /*Reiniciamos la variable ya que si una categoría no tiene posts se mezclará con las
                que si tienen posts*/
                this.posts=[];
                //Si hemos seleccinado un categoría
                if (this.category) {
                    this.getPostsByCategory();
                }else{
                    this.getPosts();  
                }                           
            }
        );
    }

    /**
     * Función que obtiene los posts por categoría
     */
    getPostsByCategory() {
        this.postsSubscription=this._postService.getPostsByCategory(this.page, this.category).subscribe(
            response => {
                //Si hay posts
                if (response.Posts.length) {
                    this.pageTitle=`Posts de la categoría ${this.category}`;
                    this.loading = false;
                    this.posts = response.Posts;
                    this.pagination(response.totalPages);
                } else {
                    this.loading = true;
                    this.noPosts=true;
                }
            },
            error => {}
        );
    }

    /**
     * Función que obtiene los posts
     */
    getPosts() {
        this.postsSubscription=this._postService.getPosts(this.page).subscribe(
            response => {
                //Si hay posts
                if (response.Posts.length) {
                    this.loading = false;
                    this.posts = response.Posts;
                    this.pagination(response.totalPages);
                } else {
                    this.loading = true;
                    this.noPosts=true;
                }
            },
            error => {}
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
     * Función que comprueba si se cambió el rol al usuario
     */
    checkRoleChanged(){
        if (localStorage.hasOwnProperty('updatedRole')) {
            let userLoggedIn=this._userService.getUserLoggedIn();
            //Si está logueado el usuario que le hemos cambiado el rol
            if (userLoggedIn&&localStorage.getItem('updatedRole')==userLoggedIn.nick) {
                this.roleChanged=true;
                localStorage.removeItem('updatedRole');
            }
        }  
    }
}