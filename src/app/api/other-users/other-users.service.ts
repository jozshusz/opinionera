import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OtherUsersService {

  constructor(
    private http: HttpClient
    ) { }

  private baseUrl = 'http://www.forumbackend.com/api/';

  getUserWithComments(id){
    return this.http.get(this.baseUrl + "user/" + id);
  }

}
