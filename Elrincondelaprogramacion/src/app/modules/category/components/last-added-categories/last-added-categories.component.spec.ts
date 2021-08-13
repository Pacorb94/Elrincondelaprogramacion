import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastAddedCategoriesComponent } from './last-added-categories.component';

describe('LastAddedCategoriesComponent', () => {
  let component: LastAddedCategoriesComponent;
  let fixture: ComponentFixture<LastAddedCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastAddedCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastAddedCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
