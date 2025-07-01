import { TestBed } from '@angular/core/testing';

import { PrepareGuideService } from './prepare-guide.service';

describe('PrepareGuideService', () => {
  let service: PrepareGuideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrepareGuideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
