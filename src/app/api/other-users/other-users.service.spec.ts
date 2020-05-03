/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OtherUsersService } from './other-users.service';

describe('Service: OtherUsers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OtherUsersService]
    });
  });

  it('should ...', inject([OtherUsersService], (service: OtherUsersService) => {
    expect(service).toBeTruthy();
  }));
});
