import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploaderPostComponent } from './file-uploader-post.component';

describe('FileUploaderPostComponent', () => {
  let component: FileUploaderPostComponent;
  let fixture: ComponentFixture<FileUploaderPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploaderPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploaderPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
