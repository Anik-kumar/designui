import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpTopNavMessageComponent } from './dp-top-nav-message.component';

describe('DpTopNavMessageComponent', () => {
  let component: DpTopNavMessageComponent;
  let fixture: ComponentFixture<DpTopNavMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpTopNavMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpTopNavMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
