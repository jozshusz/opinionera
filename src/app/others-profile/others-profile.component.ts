import { Component, OnInit } from '@angular/core';
import { OtherUsersService } from '../api/other-users/other-users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../api/token/token.service';
import { AuthService } from '../api/auth/auth.service';

@Component({
  selector: 'app-others-profile',
  templateUrl: './others-profile.component.html',
  styleUrls: ['./others-profile.component.css']
})
export class OthersProfileComponent implements OnInit {

  public userId;
  public isLoggedIn = false;
  public userInfo = null;

  constructor(
    private userService: OtherUsersService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.userId = paramMap.get('userId');
      if(this.userId == localStorage.getItem("userId")){
        this.router.navigateByUrl('/profile');
      }

      this.initProfile(this.userId);

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

}
