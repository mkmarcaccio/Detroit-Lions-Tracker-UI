import { TestBed } from '@angular/core/testing';

import { DetroitLionsTrackerService } from './detroit-lions-tracker.service';

describe('DetroitLionsTrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetroitLionsTrackerService = TestBed.get(DetroitLionsTrackerService);
    expect(service).toBeTruthy();
  });
});
