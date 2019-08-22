import { TestBed } from '@angular/core/testing';

import { TeamformationService } from './teamformation.service';

describe('TeamformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeamformationService = TestBed.get(TeamformationService);
    expect(service).toBeTruthy();
  });
});
