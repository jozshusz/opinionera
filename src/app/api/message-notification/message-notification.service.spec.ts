/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MessageNotificationService } from './message-notification.service';

describe('Service: MessageNotification', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageNotificationService]
    });
  });

  it('should ...', inject([MessageNotificationService], (service: MessageNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
