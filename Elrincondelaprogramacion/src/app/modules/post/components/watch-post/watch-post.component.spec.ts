import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchPostComponent } from './watch-post.component';

describe('WatchPostComponent', () => {
  let component: WatchPostComponent;
  let fixture: ComponentFixture<WatchPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
