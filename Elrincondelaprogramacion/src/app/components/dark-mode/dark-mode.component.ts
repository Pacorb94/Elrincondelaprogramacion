import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DarkModeService } from 'angular-dark-mode';

@Component({
    selector: 'dark-mode',
    templateUrl: './dark-mode.component.html',
    styleUrls: ['./dark-mode.component.scss']
})
export class DarkModeComponent{
    darkMode$:Observable<boolean>;

    constructor(private _darkModeService:DarkModeService) {
        this.darkMode$=new Observable<boolean>();
    }

    onToggle(): void {
        this._darkModeService.toggle();
    }
}