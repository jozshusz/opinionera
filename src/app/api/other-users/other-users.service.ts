import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OtherUsersService {

  private baseUrl = 'https://mememarketing.io/api/';

  constructor(
    private http: HttpClient
    ) { }

  getUserWithComments(id){
    return this.http.get(this.baseUrl + "user/" + id);
  }

}
