import { TestBed } from '@angular/core/testing';

import { ScoreboardService } from './scoreboard.service';

describe('ScoreboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScoreboardService = TestBed.get(ScoreboardService);
    expect(service).toBeTruthy();
  });
});
