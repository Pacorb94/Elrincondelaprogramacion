import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastAddedCategoryComponent } from './last-added-category.component';

describe('LastAddedCategoryComponent', () => {
  let component: LastAddedCategoryComponent;
  let fixture: ComponentFixture<LastAddedCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastAddedCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastAddedCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
