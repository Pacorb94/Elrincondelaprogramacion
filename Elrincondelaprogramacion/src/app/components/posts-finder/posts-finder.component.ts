import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../../modules/post/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'posts-finder',
    templateUrl: './posts-finder.component.html',
    styleUrls: ['./posts-finder.component.scss']
})
export class PostsFinderComponent implements OnInit, OnDestroy {
    pageTitle: string;
    posts:any[];
    loading: boolean;
    imageUrl:string;
    noPosts:any;
    subscription:Subscription;
    //------Paginación-------
    page: any;
    prevPage: number;
    nextPage: number;
    totalPages: number[];

    constructor(private _postService:PostService, private _route:ActivatedRoute) {
        this.pageTitle = 'Posts';
        this.posts=[];
        this.loading = true;
        this.imageUrl=`${environment.url}/posts-images/`;
        this.subscription=new Subscription();
        this.prevPage = 0;
        this.nextPage = 0;
        this.totalPages = [];
    }

    ngOnInit(): void {
        this.getRouteParams();
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
    
    /**
     * Función que obtiene los parámetros de la ruta
     */
    getRouteParams(){
        
    }
    
    /**
     * 
     */
    getPosts(){
        
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
}