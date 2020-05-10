import { Component, OnInit } from '@angular/core';
import { StatusService } from '../api/status/status.service';
import { Router } from '@angular/router';
import { TokenService } from '../api/token/token.service';
import { MsgNotiPollingService } from '../api/polling/msg-noti-polling.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit {

  public loggedIn: boolean;
  public hideNotification: boolean = true;

  searchForm: FormGroup;
  submitted = false;

  constructor(
    private statusService: StatusService,
    private router: Router,
    private tokenService: TokenService,
    private pollingService: MsgNotiPollingService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.statusService.authStatus.subscribe( value => this.loggedIn = value );

    this.pollingService.newMsgNoti.subscribe( value => this.hideNotification = !value );

    this.searchForm = this.formBuilder.group({
      searchInput: ['', Validators.required]
    });
  }

  logout(event: MouseEvent){
    event.preventDefault();
    this.pollingService.pollUnsubscribe();
    this.statusService.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
    this.tokenService.remove();
  }

  setShowNotification(){
    this.hideNotification = true;
  }

  setHideNotification(){
    this.hideNotification = true;
  }

  get f() { return this.searchForm.controls; }

  // to submit search
  onSubmit(){
    if(this.searchForm.value["searchInput"].trim()){
      let url = "/search/" + this.searchForm.value["searchInput"].trim();
      this.router.navigateByUrl(url);
    }
  }
}
