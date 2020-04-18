import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetAllPostsService {

  postsList: any;

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://www.forumbackend.com/api/';

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
}
