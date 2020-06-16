import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserAccessComponent } from './manage-user-access.component';

describe('ManageUserAccessComponent', () => {
  let component: ManageUserAccessComponent;
  let fixture: ComponentFixture<ManageUserAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUserAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUserAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
