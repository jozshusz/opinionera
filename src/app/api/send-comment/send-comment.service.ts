import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendCommentService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'https://opinionerabackend.herokuapp.com/api/';

  sendComment(data) {
    return this.http.post(this.baseUrl + 'sendComment', data);
  }

  upvoteComment(data) {
    return this.http.post(this.baseUrl + 'upvote', data);
  }

  deleteComment(data){
    return this.http.post(this.baseUrl + 'deleteComment', data);
  }

  updateComment(data){
    return this.http.post(this.baseUrl + 'updateComment', data);
  }

  deleteOwnComment(data){
    return this.http.post(this.baseUrl + 'deleteOwnComment', data);
  }

  reportComment(data){
    return this.http.post(this.baseUrl + 'reportComment', data);
  }

}
