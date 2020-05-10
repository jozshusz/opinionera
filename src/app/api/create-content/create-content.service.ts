import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateContentService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://www.forumbackend.com/api/';

  createPost(data) {
    return this.http.post(this.baseUrl + 'createPost', data);
  }

  createNews(data) {
    return this.http.post(this.baseUrl + 'createNews', data);
  }

}
