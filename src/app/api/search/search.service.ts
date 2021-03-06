import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl = 'http://www.forumbackend.com/api/';

  constructor(
    private http: HttpClient
  ) { }

  getSearchResults(words){
    return this.http.get(this.baseUrl + "search/" + words);
  }
}
