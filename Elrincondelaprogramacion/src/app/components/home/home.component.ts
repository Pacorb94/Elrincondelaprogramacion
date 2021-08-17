import { Component } from '@angular/core';
import { NgcCookieConsentService } from 'ngx-cookieconsent';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
   
    constructor(private ccService: NgcCookieConsentService) {}
}