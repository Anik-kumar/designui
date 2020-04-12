import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpSideNavComponent } from './dp-side-nav.component';

describe('DpSideNavComponent', () => {
  let component: DpSideNavComponent;
  let fixture: ComponentFixture<DpSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
