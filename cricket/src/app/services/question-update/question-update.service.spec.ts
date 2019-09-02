import { TestBed } from '@angular/core/testing';

import { QuestionUpdateService } from './question-update.service';

describe('QuestionUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionUpdateService = TestBed.get(QuestionUpdateService);
    expect(service).toBeTruthy();
  });
});
