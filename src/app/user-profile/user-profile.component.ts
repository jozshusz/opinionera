import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../api/auth/auth.service';
import { TokenService } from '../api/token/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { MessageNotificationService } from '../api/message-notification/message-notification.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userInfo = null;
  currentUsersComments = null;
  token;
  dataJson = null;
  displayNotification = null;
  allNotifShowing = false;

  selectedFile: File = null;

  @ViewChild('selectFileInput')
  selectFileInput: ElementRef;

  responseMessage = null;
  errorMessage = null;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private httpService: HttpClient,
    private messageNotificationService: MessageNotificationService
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
    this.displayNotification = this.userInfo["notifications"].slice(0, 5);
  }

  showMoreNotification(){
    this.displayNotification = this.userInfo["notifications"];
    this.allNotifShowing = true;
  }

  showLessNotification(){
    this.displayNotification = this.displayNotification.slice(0, 5);
    this.allNotifShowing = false;
  }

  handleError(error){
    console.log(error);
  }

  toggleMsgNoti(msgNoti, checkNeeded){
    msgNoti['show'] = !msgNoti['show'];
    
    // checkNeeded only true if 'opened' field needs to be changed (notifications and reveived msg)
    if(checkNeeded){
      if(!msgNoti.opened){
        this.dataJson = {
          'token' : this.token['token'],
          'id' : msgNoti.id
        };
        if(msgNoti.comment_id){
          this.dataJson['type'] = 'notification';
        }else{
          this.dataJson['type'] = 'message';
        }
        this.messageNotificationService.setOpenMsgNoti(this.dataJson).subscribe(
          data => msgNoti['opened'] = true,
          error => console.log(error)
        );
      }
    }
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

  showMyComments(){
    this.authService.getCurrentUsersComment(this.token).subscribe(
      data => {
        this.currentUsersComments = data;
      },
      error => this.handleError(error)
    );
  }

}
