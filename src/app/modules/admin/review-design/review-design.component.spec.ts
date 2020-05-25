import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDesignComponent } from './review-design.component';

describe('ReviewDesignComponent', () => {
  let component: ReviewDesignComponent;
  let fixture: ComponentFixture<ReviewDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
