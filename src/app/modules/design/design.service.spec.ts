import { TestBed } from '@angular/core/testing';

import { DesignService } from './design.service';

describe('NewdesignService', () => {
  let service: DesignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
