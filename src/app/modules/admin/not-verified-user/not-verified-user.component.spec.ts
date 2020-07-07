import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotVerifiedUserComponent } from './not-verified-user.component';

describe('NotVerifiedUserComponent', () => {
  let component: NotVerifiedUserComponent;
  let fixture: ComponentFixture<NotVerifiedUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotVerifiedUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotVerifiedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
