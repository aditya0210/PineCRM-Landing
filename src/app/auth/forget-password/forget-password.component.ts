import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPassword: FormGroup;
  submitted = false;
  loadingSpinner = false;
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private toastr: ToastrService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.forgetPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get forgetFormControls() {
    return this.forgetPassword.controls;
  }

  onSubmit() {
    this.loadingSpinner = true;
    this.submitted = true;
    if (this.forgetPassword.invalid) {
      return;
    }
    this._authService.forgotPassword(this.forgetPassword.get('email').value)
      .pipe()
      .subscribe(data => {
        this.loadingSpinner = false;
        this.toastr.success('Successfully', 'Email Sent', {
          timeOut: 1500
        });
        this._router.navigate(['/login'])
      }, err => {
        this.loadingSpinner = false;
        this.toastr.error('', err.error.email[0], {
          timeOut: 1500
        });
      })
    console.log(this.forgetPassword.get('email').value);
  }
}
