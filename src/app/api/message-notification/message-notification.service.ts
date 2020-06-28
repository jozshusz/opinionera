import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageNotificationService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://www.forumbackend.com/api/';

  sendMessage(data) {
    return this.http.post(this.baseUrl + 'sendMessage', data);
  }

  setOpenMsgNoti(data){
    return this.http.post(this.baseUrl + 'openMsgNoti', data);
  }

  notifyFollowers(data){
    return this.http.post(this.baseUrl + 'notifyFollowers', data);
  }

  makeFollower(data){
    return this.http.post(this.baseUrl + 'makeFollower', data);
  }
}
