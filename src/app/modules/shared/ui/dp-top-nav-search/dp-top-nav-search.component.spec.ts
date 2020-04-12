import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpTopNavSearchComponent } from './dp-top-nav-search.component';

describe('DpTopNavSearchComponent', () => {
  let component: DpTopNavSearchComponent;
  let fixture: ComponentFixture<DpTopNavSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpTopNavSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpTopNavSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
