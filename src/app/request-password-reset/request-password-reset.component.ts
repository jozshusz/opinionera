import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.css']
})
export class RequestPasswordResetComponent implements OnInit {

  loading = false;
  submitted = false;

  public form: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  onSubmit(){
    this.submitted = true;
    this.loading = true;
    this.authService.sendPasswordResetLink(this.form.value).subscribe(
      data => this.handleResponse(data),
      error => console.log(error)
    );
  }

  get f() { return this.form.controls; }

  handleResponse(res){
    console.log(res);
    this.form.value.email = null;
    this.loading = false;
  }
}
