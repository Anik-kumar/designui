import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpTopNavNotificationItemComponent } from './dp-top-nav-notification-item.component';

describe('DpTopNavNotificationItemComponent', () => {
  let component: DpTopNavNotificationItemComponent;
  let fixture: ComponentFixture<DpTopNavNotificationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpTopNavNotificationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpTopNavNotificationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
