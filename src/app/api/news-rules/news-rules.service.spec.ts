/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NewsRulesService } from './news-rules.service';

describe('Service: NewsRules', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsRulesService]
    });
  });

  it('should ...', inject([NewsRulesService], (service: NewsRulesService) => {
    expect(service).toBeTruthy();
  }));
});
