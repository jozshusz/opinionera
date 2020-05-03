import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://www.forumbackend.com/api/';

  signUp(data) {
    return this.http.post(this.baseUrl + 'signup', data);
  }

  login(data) {
    return this.http.post(this.baseUrl + 'login', data);
  }

  sendPasswordResetLink(data){
    return this.http.post(this.baseUrl + 'passwordResetLink', data);
  }

  changePassword(data){
    return this.http.post(this.baseUrl + 'changePassword', data);
  }

  getCurrentUser(data){
    return this.http.post(this.baseUrl + 'me', data);
  }

}
