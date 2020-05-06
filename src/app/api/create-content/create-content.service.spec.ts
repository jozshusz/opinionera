/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CreateContentService } from './create-content.service';

describe('Service: CreateContent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateContentService]
    });
  });

  it('should ...', inject([CreateContentService], (service: CreateContentService) => {
    expect(service).toBeTruthy();
  }));
});
