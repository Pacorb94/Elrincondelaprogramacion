import { Component, OnInit } from '@angular/core';
import { PostService } from './../../services/post.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    pageTitle: string;
    posts: any;
    loading: boolean;
    //------Paginación-------
    page: any;
    prevPage: number;
    nextPage: number;
    totalPages: number[];

    constructor(private _postService: PostService, private _router: Router, 
    private _route: ActivatedRoute) { 
        this.pageTitle = 'Posts';
        this.loading = true;
        this.prevPage = 0;
        this.nextPage = 0;
        this.totalPages = [];
    }

    ngOnInit(): void {
        this.getRoutePage();
    }

    /**
     * Función que obtiene la página de la ruta
     */
    getRoutePage() {
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
                this.getPosts();
            }
        );
    }

    /**
     * Función que obtiene los posts
     */
    getPosts() {
        this._postService.getPosts(this.page).subscribe(
            response => {
                //Si hay vídeos
                if (response.Posts.length) {
                    this.loading = false;
                    this.posts = response.Posts;
                    this.pagination(response.totalPages);
                } else {
                    this.loading = true;
                }
            },
            error => {
                this._router.navigate(['']);
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
     * Función que ve un post
     * @param id 
     */
    watchPost(id:number){
        this._router.navigate(['/watch-post', id]);
    }
}