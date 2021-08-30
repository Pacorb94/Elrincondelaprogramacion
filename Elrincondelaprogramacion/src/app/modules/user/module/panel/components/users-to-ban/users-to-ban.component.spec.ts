import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersToBanComponent } from './users-to-ban.component';

describe('UsersToBanComponent', () => {
  let component: UsersToBanComponent;
  let fixture: ComponentFixture<UsersToBanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersToBanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersToBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
