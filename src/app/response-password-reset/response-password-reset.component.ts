import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../api/auth/auth.service';

@Component({
  selector: 'app-response-password-reset',
  templateUrl: './response-password-reset.component.html',
  styleUrls: ['./response-password-reset.component.css']
})
export class ResponsePasswordResetComponent implements OnInit {

  public errorMessage;
  submitted = false;
  loading = false;
  pwResetForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    password_confirmation: ['', Validators.required],
    reset_token: null
  });

  constructor(
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navigator: Router
    ) { 
      this.router.queryParams.subscribe( 
        params => {
          this.pwResetForm.controls['reset_token'].setValue(params['token'])
        }
      );
    }

  ngOnInit() {
  }
  
  onSubmit(){
    this.submitted = true;
    this.loading = true;

    this.authService.changePassword(this.pwResetForm.value).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data){
    this.navigator.navigateByUrl("/login");
  }

  // error handling for email format and password match
  handleError(error){
    this.errorMessage = error.error.errors;
    this.loading = false;
  }

  get f() { return this.pwResetForm.controls; }

}
