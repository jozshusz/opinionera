import { Component, OnInit } from '@angular/core';
import { StatusService } from '../api/status/status.service';
import { Router } from '@angular/router';
import { TokenService } from '../api/token/token.service';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit {
  public loggedIn: boolean;

  constructor(
    private statusService: StatusService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.statusService.authStatus.subscribe( value => this.loggedIn = value );
  }

  logout(event: MouseEvent){
    event.preventDefault();
    this.statusService.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
    this.tokenService.remove();
  }
}
