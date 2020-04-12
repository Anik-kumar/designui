import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpTopNavUserComponent } from './dp-top-nav-user.component';

describe('DpTopNavUserComponent', () => {
  let component: DpTopNavUserComponent;
  let fixture: ComponentFixture<DpTopNavUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpTopNavUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpTopNavUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
