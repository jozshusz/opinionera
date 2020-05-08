import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsRulesService {

  private baseUrl = 'http://www.forumbackend.com/api/';

  constructor(private http: HttpClient) { }

  getNews() {
    return this.http.get(this.baseUrl + "news");
  }
}
