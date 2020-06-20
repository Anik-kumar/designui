import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReviewingComponent } from './all-reviewing.component';

describe('AllReviewingComponent', () => {
  let component: AllReviewingComponent;
  let fixture: ComponentFixture<AllReviewingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllReviewingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllReviewingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
