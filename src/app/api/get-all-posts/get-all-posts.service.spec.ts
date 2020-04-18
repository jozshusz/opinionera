/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetAllPostsService } from './get-all-posts.service';

describe('Service: GetAllPosts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetAllPostsService]
    });
  });

  it('should ...', inject([GetAllPostsService], (service: GetAllPostsService) => {
    expect(service).toBeTruthy();
  }));
});
