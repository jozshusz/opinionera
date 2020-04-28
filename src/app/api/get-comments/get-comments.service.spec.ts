/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetCommentsService } from './get-comments.service';

describe('Service: GetComments', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetCommentsService]
    });
  });

  it('should ...', inject([GetCommentsService], (service: GetCommentsService) => {
    expect(service).toBeTruthy();
  }));
});
