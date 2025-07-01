import { TestBed } from '@angular/core/testing';

import { MakeGuideService } from './make-guide.service';

describe('MakeGuideService', () => {
  let service: MakeGuideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakeGuideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
