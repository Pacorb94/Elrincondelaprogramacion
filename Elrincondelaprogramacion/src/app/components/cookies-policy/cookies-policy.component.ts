import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cookies-policy',
    templateUrl: './cookies-policy.component.html',
    styleUrls: ['./cookies-policy.component.scss']
})
export class CookiesPolicyComponent implements OnInit {
    cookiesPolicies:any[];

    constructor() {
        this.cookiesPolicies=[];
    }

    ngOnInit():void{
        this.loadCookiesPolicies();
    }

    /**
     * Función que carga las políticas de cookies
     */
    loadCookiesPolicies(){
        this.cookiesPolicies=[
            {
                name:'token', 
                duration:'1 año', 
                description:`Permite al usuario identificarse y realizar 
                                acciones sólo para usuarios identificados`
            },
            {
                name:'cookieconsent_status', 
                duration:'1 año', 
                description:`Permite saber si el usuario aceptó 
                                el consentimiento de las cookies`
            }
        ];
    }
}
