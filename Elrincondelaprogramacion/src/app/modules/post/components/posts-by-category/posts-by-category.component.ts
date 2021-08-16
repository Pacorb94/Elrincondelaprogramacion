import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../../service/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'posts-by-category',
    templateUrl: './posts-by-category.component.html',
    styleUrls: ['./posts-by-category.component.scss']
})
export class PostsByCategoryComponent implements OnInit, OnDestroy {
    pageTitle: string;
    category: any;
    posts: any;
    loading: boolean;
    imageUrl:string;
    subscription:Subscription;
    //------Paginación-------
    page: any;
    prevPage: number;
    nextPage: number;
    totalPages: number[];

    constructor(private _postService: PostService, private _router: Router, 
    private _route: ActivatedRoute) { 
        this.pageTitle = 'Posts por la categoría';
        this.loading = true;
        this.imageUrl=`${environment.url}/posts-images/`;
        this.subscription=new Subscription();
        this.prevPage = 0;
        this.nextPage = 0;
        this.totalPages = [];
    }

    ngOnInit(): void {
        this.getRouteParms();
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

    /**
     * Función que obtiene los parámetros de la ruta
     */
    getRouteParms() {
        this._route.params.subscribe(
            params => {
                this.page = params['page'];
                this.category=params['category'];
                console.log(this.category);
                if (this.category) {
                    //Si tiene valor y es un número sino será el por defecto
                    if (this.page && this.page.match(/[\d]+/)) {
                        this.page = Number.parseInt(this.page);
                    } else {
                        this.page = 1;
                        this.prevPage = 1;
                        this.nextPage = 2;
                    }
                   // this.getPostsByCategory();
                }else{
                    this._router.navigate(['']);
                }              
            }
        );
    }

    /**
     * Función que obtiene los posts por categoría
     */
   /* getPostsByCategory() {
        this.subscription=this._postService.getPostsByCategory(this.page, this.category).subscribe(
            response => {
                //Si hay posts
                if (response.Posts.length) {
                    this.loading = false;
                    this.posts = response.Posts;
                    this.category=
                    this.pagination(response.totalPages);
                } else {
                    this.loading = true;
                }
            },
            error => {
                this._router.navigate(['']);
            }
        );
    }*/

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
     * Función que ve un post
     * @param title
     */
    watchPost(title:string){
        this._router.navigate(['/watch-post', title]);
    }
}
