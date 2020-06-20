import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRejectedComponent } from './all-rejected.component';

describe('AllRejectedComponent', () => {
  let component: AllRejectedComponent;
  let fixture: ComponentFixture<AllRejectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRejectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
