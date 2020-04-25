import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../api/auth/auth.service';
import { TokenService } from '../api/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
    ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });
  }

  onSubmit(){
    this.submitted = true;
    this.loading = true;
    this.authService.signUp(this.signupForm.value).subscribe(
      data => this.handleResponse(data),
      error => console.log(error)
    );
    this.loading = false;
  }

  get f() { return this.signupForm.controls; }

  handleResponse(data){
    this.tokenService.handle(data.access_token);
    this.router.navigateByUrl('/profile');
  }
}
