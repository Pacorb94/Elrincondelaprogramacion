import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostActivePostsComponent } from './most-active-posts.component';

describe('MostActivePostsComponent', () => {
  let component: MostActivePostsComponent;
  let fixture: ComponentFixture<MostActivePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostActivePostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostActivePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
