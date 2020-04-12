import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpTopNavMessageItemComponent } from './dp-top-nav-message-item.component';

describe('DpTopNavMessageItemComponent', () => {
  let component: DpTopNavMessageItemComponent;
  let fixture: ComponentFixture<DpTopNavMessageItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpTopNavMessageItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpTopNavMessageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
