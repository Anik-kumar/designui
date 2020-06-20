import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllApprovedComponent } from './all-approved.component';

describe('AllApprovedComponent', () => {
  let component: AllApprovedComponent;
  let fixture: ComponentFixture<AllApprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllApprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
