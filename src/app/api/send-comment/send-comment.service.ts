import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendCommentService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://www.forumbackend.com/api/';

  sendComment(data) {
    return this.http.post(this.baseUrl + 'sendComment', data);
  }

}
