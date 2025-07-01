import { TestBed } from '@angular/core/testing';

import { RecordDataService } from './record-data.service';

describe('RecordDataService', () => {
  let service: RecordDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
