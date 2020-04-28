/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SendCommentService } from './send-comment.service';

describe('Service: SendComment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendCommentService]
    });
  });

  it('should ...', inject([SendCommentService], (service: SendCommentService) => {
    expect(service).toBeTruthy();
  }));
});
