import { Component } from '@angular/core';
import { UserService } from './../../../../service/user.service';
import { FileUploader } from 'ng2-file-upload';
import { NgClass, NgStyle} from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from './../../../../../../../environments/environment';

@Component({
    selector: 'file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent {
    user:any;
    uploader:FileUploader;
    hasBaseDropZoneOver:boolean;
    imagePreview:any;

    constructor(private _userService:UserService, private _sanitizer:DomSanitizer) {
        this.user=this._userService.getUserLoggedIn();
        this.uploader=new FileUploader(
            {url:`${environment.url}/profile-image/upload`, allowedFileType:['image']}
        );
        this.hasBaseDropZoneOver=false;
        this.previousView();
    }

    public fileOverBase(e:any) {
        this.hasBaseDropZoneOver=e;
    }

    /**
     * Función que carga una vista previa de la imagen
     */
    previousView(){
        this.uploader.onAfterAddingFile=(fileItem) => {
            this.imagePreview=this._sanitizer
                                .bypassSecurityTrustUrl((window.URL.createObjectURL(fileItem._file)));
        }
    }

    setProfileImageLocalStorage(){
        this.uploader.onAfterAddingFile=(fileItem) => {
            console.log(fileItem._file.name);
        }
    }
}
