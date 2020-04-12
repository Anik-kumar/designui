import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpTopNavComponent } from './dp-top-nav.component';

describe('DpTopNavComponent', () => {
  let component: DpTopNavComponent;
  let fixture: ComponentFixture<DpTopNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpTopNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
