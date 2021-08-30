import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../service/user.service';
import { FileUploader } from 'ng2-file-upload';
import { NgClass, NgStyle} from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../../../../environments/environment';

@Component({
    selector: 'file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit{
    user:any;
    uploader:FileUploader;
    hasBaseDropZoneOver:boolean;
    imagePreview:any;

    constructor(private _userService:UserService, private _sanitizer:DomSanitizer) {
        this.user=this._userService.getUserLoggedIn();
        this.uploader=new FileUploader({
            url: `${environment.url}/profile-image/upload`, allowedFileType:['image']
        });  
        this.hasBaseDropZoneOver=false;
    }

    ngOnInit(){
        this.previousView();
        this.setProfileImage();      
    }

    /**
     * Función que carga una vista previa de la imagen
     * cuando se añade una imagen
     */
    previousView(){
        this.uploader.onAfterAddingFile=fileItem => {
            this.imagePreview=this._sanitizer
                                .bypassSecurityTrustUrl((window.URL.createObjectURL(fileItem._file)));
        }
    }

    /**
     * Función que asigna la imagen al usuario
     */
    setProfileImage(){
        this.uploader.onCompleteItem=fileItem=>{
            let fileName=JSON.parse(fileItem._xhr.response).image;
            this.user.profileImage=fileName;
            localStorage.setItem('user', JSON.stringify(this.user));
            //Le damos el usuario al BehaviourSubject
            this._userService.setUserLoggedIn$(this.user);
        }      
    }

    public fileOverBase(e:any) {
        this.hasBaseDropZoneOver=e;
    }
}
