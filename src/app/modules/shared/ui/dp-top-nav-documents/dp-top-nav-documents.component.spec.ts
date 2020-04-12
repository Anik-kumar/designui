import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpTopNavDocumentsComponent } from './dp-top-nav-documents.component';

describe('DpTopNavDocumentsComponent', () => {
  let component: DpTopNavDocumentsComponent;
  let fixture: ComponentFixture<DpTopNavDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpTopNavDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpTopNavDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
