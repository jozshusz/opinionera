import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsRulesService {

  private baseUrl = 'https://mememarketing.io/api/';

  constructor(private http: HttpClient) { }

  getNews() {
    return this.http.get(this.baseUrl + "news");
  }
  
  getNewsDevAnnounce() {
    return this.http.get(this.baseUrl + "newsDevAnn");
  }
  
  getNewsRepair() {
    return this.http.get(this.baseUrl + "newsRepair");
  }

  getRules() {
    return this.http.get(this.baseUrl + "rules");
  }

  getFaqs() {
    return this.http.get(this.baseUrl + "faqs");
  }
  
}
