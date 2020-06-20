import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSubmittedComponent } from './all-submitted.component';

describe('AllSubmittedComponent', () => {
  let component: AllSubmittedComponent;
  let fixture: ComponentFixture<AllSubmittedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSubmittedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
