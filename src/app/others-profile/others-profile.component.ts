import { Component, OnInit } from '@angular/core';
import { OtherUsersService } from '../api/other-users/other-users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../api/token/token.service';
import { AuthService } from '../api/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageNotificationService } from '../api/message-notification/message-notification.service';

@Component({
  selector: 'app-others-profile',
  templateUrl: './others-profile.component.html',
  styleUrls: ['./others-profile.component.css']
})
export class OthersProfileComponent implements OnInit {

  public userId;
  public isLoggedIn = false;
  public userInfo = null;

  messageForm: FormGroup;
  submitted = false;
  loading = false;
  sendMessage = false;

  constructor(
    private userService: OtherUsersService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageNotificationService: MessageNotificationService
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.userId = paramMap.get('userId');
      if(this.userId == localStorage.getItem("userId")){
        this.router.navigateByUrl('/profile');
      }

      this.initProfile(this.userId);

      this.messageForm = this.formBuilder.group({
        receiver: null,
        messageHeader: ['', Validators.required],
        messageBody: ['', Validators.required],
        token: null
      });

      // check if user is logged in
      this.isLoggedIn = this.tokenService.loggedIn();
    });
  }

  initProfile(userId){
    this.userService.getUserWithComments(userId)
      .subscribe((res: any) => {
        this.userInfo = res[0];
      }, error => {
        this.handleError(error)
      });
  }

  handleError(error){
    console.error(error);
  }

  sendMessageButton(){
    this.sendMessage = true;
  }

  get f() { return this.messageForm.controls; }

  onSubmit(){
    this.submitted = true;
    this.loading = true;
    this.messageForm.controls['token'].setValue(this.tokenService.get())
    this.messageForm.controls['receiver'].setValue(this.userId)

    this.messageNotificationService.sendMessage(this.messageForm.value).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
    this.loading = false;
  }
}
