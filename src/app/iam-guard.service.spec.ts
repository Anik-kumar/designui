import { TestBed } from '@angular/core/testing';

import { IamGuardService } from './iam-guard.service';

describe('IamGuardService', () => {
  let service: IamGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IamGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
