import { TestBed } from '@angular/core/testing';

import { NewdesignService } from './newdesign.service';

describe('NewdesignService', () => {
  let service: NewdesignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewdesignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
