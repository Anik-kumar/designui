import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpSideNavItemComponent } from './dp-side-nav-item.component';

describe('DpSideNavItemComponent', () => {
  let component: DpSideNavItemComponent;
  let fixture: ComponentFixture<DpSideNavItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpSideNavItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpSideNavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
