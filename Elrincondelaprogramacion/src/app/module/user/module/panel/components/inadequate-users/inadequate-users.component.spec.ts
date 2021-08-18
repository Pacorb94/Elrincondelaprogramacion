import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InadequateUsersComponent } from './inadequate-users.component';

describe('InadequateUsersComponent', () => {
  let component: InadequateUsersComponent;
  let fixture: ComponentFixture<InadequateUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InadequateUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InadequateUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
