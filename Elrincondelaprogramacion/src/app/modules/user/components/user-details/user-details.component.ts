import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../../../post/service/post.service';
import { UserService } from 'src/app/modules/user/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Subscription, Subject } from 'rxjs';

@Component({
    selector: 'user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
    posts:any[];
    profileImage:any;
    loading:boolean;
    imageUrl:string;
    noPosts:any;
    postsSubscription:Subscription; 
    loadProfileImageSubscription:Subscription;
    //-----Tabla------
    dtOptions:DataTables.Settings;
    dtTrigger:Subject<any>;

    constructor(private _postService:PostService, private _route:ActivatedRoute, 
    private _router:Router,private _userService:UserService,
    private _sanitizer:DomSanitizer) { 
        this.posts=[];
        this.loading=true;
        this.imageUrl=`${environment.url}/posts-images/`;
        this.postsSubscription=new Subscription();
        this.loadProfileImageSubscription=new Subscription();
        this.dtOptions={};
        this.dtTrigger=new Subject<any>();
    }

    ngOnInit(): void {
        this.getRouteParams();
        this.loadTableConfiguration();
    }

    ngOnDestroy(){
        this.postsSubscription.unsubscribe();
        this.loadProfileImageSubscription.unsubscribe();
        this.dtTrigger.unsubscribe();
    }

    /**
     * Función que carga la configuración de la tabla
     */
    loadTableConfiguration(){
        this.dtOptions = {
            pagingType:'full_numbers',
            pageLength:5,
            language:{url:'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'}
        };
    }

    /**
     * Función que obtiene los parámetros de la ruta
     */
    getRouteParams() {
        this._route.params.subscribe(
            params => {
                let userId = params['id'];
                this.getUserPosts(userId);
            }
        );
    }

    /**
     * Función que obtiene los posts del usuario
     * @param id
     */
    getUserPosts(id:number) {
        this.postsSubscription=this._postService.getUserPosts(id).subscribe(
            response => {
                //Si hay posts
                if (response) {            
                    this.loading = false;
                    this.profileImage=response[0].user.profileImage;
                    this.loadProfileImage();
                    this.posts = response;
                    this.dtTrigger.next();
                } else {
                    this.loading = true;
                    this.noPosts=true;
                }
            },
            error => {
                this._router.navigate(['']);
            }
        );
    }
    
    /**
     * Función que carga la imagen de perfil del usuario, si no tiene o hay un error se asigna una por
     * defecto
     */
    loadProfileImage(){
        if (this.profileImage) {           
            this.loadProfileImageSubscription=this._userService.getProfileImage(this.profileImage)
                .subscribe(
                    response=>{
                        let imageURL=URL.createObjectURL(response);
                        this.profileImage=this._sanitizer.bypassSecurityTrustUrl(imageURL);
                    },
                    error=>{
                        this.profileImage='../../../../../assets/images/no-profile-image.png';
                    }
                );
        }else{
            this.profileImage='../../../../../assets/images/no-profile-image.png';
        }
    }
}