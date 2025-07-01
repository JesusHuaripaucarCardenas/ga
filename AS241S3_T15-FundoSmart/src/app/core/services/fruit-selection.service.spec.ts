import { TestBed } from '@angular/core/testing';

import { FruitSelectionService } from './fruit-selection';

describe('LibraryService', () => {
  let service: FruitSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FruitSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
