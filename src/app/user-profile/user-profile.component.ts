import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../api/auth/auth.service';
import { TokenService } from '../api/token/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userInfo = null;
  token;

  selectedFile: File = null;

  @ViewChild('selectFileInput')
  selectFileInput: ElementRef;

  responseMessage = null;
  errorMessage = null;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private httpService: HttpClient
    ) { }

  ngOnInit() {
    this.token = {
      'token': this.tokenService.get()
    };
    this.authService.getCurrentUser(this.token).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data){
    this.userInfo = data;
  }

  handleError(error){
    console.log(error);
  }

  // Upload avatar
  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(){
    this.responseMessage = null;
    this.errorMessage = null;

    const formData = new FormData();
    const headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    formData.append('image', this.selectedFile);
    formData.append('token', this.token['token']);

    this.httpService.post('http://www.forumbackend.com/api/avatarUpload', formData, {
      headers: headers
    }).subscribe(
      data => this.handleAvatarResponse(data),
      error => this.handleAvatarError(error)
    );
  }

  handleAvatarResponse(data){
    this.selectFileInput.nativeElement.value = "";
    this.responseMessage = data.message;
    this.userInfo.avatar = data.newAvatar;
  }

  handleAvatarError(error){
    this.errorMessage = error.error.error;
  }

}
