/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MsgNotiPollingService } from './msg-noti-polling.service';

describe('Service: MsgNotiPolling', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MsgNotiPollingService]
    });
  });

  it('should ...', inject([MsgNotiPollingService], (service: MsgNotiPollingService) => {
    expect(service).toBeTruthy();
  }));
});
