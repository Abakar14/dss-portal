import { TestBed } from '@angular/core/testing';

import { DSSService } from './dss.service';

describe('DSSService', () => {
  let service: DSSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DSSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
