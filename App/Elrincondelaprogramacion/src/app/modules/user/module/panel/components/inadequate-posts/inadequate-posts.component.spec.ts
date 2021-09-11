import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InadequatePostsComponent } from './inadequate-posts.component';

describe('InadequatePostsComponent', () => {
  let component: InadequatePostsComponent;
  let fixture: ComponentFixture<InadequatePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InadequatePostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InadequatePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
