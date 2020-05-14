import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetCommentsService {

  postsList: any;
  private baseUrl = "https://opinionerabackend.herokuapp.com/api/";

  constructor(private http: HttpClient) { }

  getCommentsByPostId(postId) {
    return this.http.get(this.baseUrl + "comments/" + postId);
  }

  getCommentsByUrl(url) {
    return this.http.get(url);
  }

  getPageOfComment(postId, commentId){
    return this.http.get(this.baseUrl + "pageOfComment/" + postId + "/" + commentId);
  }

}
