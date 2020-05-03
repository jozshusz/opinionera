import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login: 'http://www.forumbackend.com/api/login',
    signup: 'http://www.forumbackend.com/api/signup'
  };

  constructor() { }

  handle(token, userId){
    this.set(token, userId);
  }

  set(token, userId){
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  get(){
    return localStorage.getItem('token');
  }

  remove(){
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  isValid(){
    const token = this.get();
    if(token){
      const payload = this.payload(token);
      if(payload){
        // it means that if we have >-1 then there is an index and iss matches one of the urls
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token){
    const payload = token.split(".")[1];
    return this.decode(payload);
  }

  decode(payload){
    return JSON.parse(atob(payload));
  }

  loggedIn(){
    return this.isValid();
  }

}
