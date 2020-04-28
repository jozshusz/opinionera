import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../api/auth/auth.service';
import { TokenService } from '../api/token/token.service';
import { Router } from '@angular/router';
import { StatusService } from '../api/status/status.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public errorMessage;
  loginForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private tokenService: TokenService,
      private router: Router,
      private statusService: StatusService
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(){
    this.submitted = true;
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
    this.loading = false;
  }

  get f() { return this.loginForm.controls; }

  handleResponse(data){
    this.tokenService.handle(data.access_token);
    this.statusService.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

  handleError(error){
    this.errorMessage = "Az email vagy jelszó nem megfelelő"
  }

}
