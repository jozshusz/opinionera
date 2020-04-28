import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetAllPostsService {

  postsList: any;
  private baseUrl = 'http://www.forumbackend.com/api/';

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(this.baseUrl + "posts");
  }

  // This way I can share the JSON across my components
  setPostsList(val: object) {
    this.postsList = val;
  }

  getPostsList(){
    return this.postsList;
  }

  getPost(sectionId, topicId, postId){
    var currentTopic = this.postsList.filter(x => x.id == sectionId)[0]['topics'].filter(y => y.id == topicId)[0];
    var currentPost = currentTopic['posts'].filter(x => x.id == postId)[0];
    return currentPost;
  }
}
