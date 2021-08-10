import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { NgClass, NgStyle} from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from './../../../../../../../environments/environment';

@Component({
    selector: 'file-uploader-post',
    templateUrl: './file-uploader-post.component.html',
    styleUrls: ['./file-uploader-post.component.scss']
})
export class FileUploaderPostComponent implements OnInit {
    uploader:FileUploader;
    hasBaseDropZoneOver:boolean;
    imagePreview:any;

    constructor(private _sanitizer:DomSanitizer) {
        this.uploader=new FileUploader({
            url: `${environment.url}/post-image/upload`, allowedFileType:['image']
        });  
        this.hasBaseDropZoneOver=false;
    }

    ngOnInit(): void {
        this.previousView();
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

    public fileOverBase(e:any) {
        this.hasBaseDropZoneOver=e;
    }
}
