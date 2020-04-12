import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpTopNavNotificationComponent } from './dp-top-nav-notification.component';

describe('DpTopNavNotificationComponent', () => {
  let component: DpTopNavNotificationComponent;
  let fixture: ComponentFixture<DpTopNavNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpTopNavNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpTopNavNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
