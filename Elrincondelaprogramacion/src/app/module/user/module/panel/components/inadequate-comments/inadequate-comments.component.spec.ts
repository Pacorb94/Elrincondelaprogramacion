import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InadequateCommentsComponent } from './inadequate-comments.component';

describe('InadequateCommentsComponent', () => {
  let component: InadequateCommentsComponent;
  let fixture: ComponentFixture<InadequateCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InadequateCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InadequateCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
