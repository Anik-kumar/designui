import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerListComponent } from './inner-list.component';

describe('InnerListComponent', () => {
  let component: InnerListComponent;
  let fixture: ComponentFixture<InnerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
