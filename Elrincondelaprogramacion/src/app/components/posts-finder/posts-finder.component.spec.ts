import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsFinderComponent } from './posts-finder.component';

describe('PostsFinderComponent', () => {
  let component: PostsFinderComponent;
  let fixture: ComponentFixture<PostsFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsFinderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
