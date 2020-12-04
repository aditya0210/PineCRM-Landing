import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptcha2Component } from 'ngx-captcha';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {

  @ViewChild('captchaElem', { static: true }) captchaElem: ReCaptcha2Component;
  @ViewChild('langInput', { static: true }) langInput: ElementRef;

  public captchaIsLoaded = false;
  countryList: any[] = [];
  statesList: any[] = [];
  usernameError: boolean = false;
  usernameErrorMessage: string = '';
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;
  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'en';
  public type: 'image' | 'audio';
  registerForm: FormGroup;
  submitted = false;
  captchaError: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.authService.getCountriesList()
      .pipe()
      .subscribe(data => {
        this.countryList = data;
      })
    this.registerForm = this.fb.group({
      salutation: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      username: ['', [Validators.required, this.isUserNameUnique.bind(this)]],
      password: ['', [Validators.required]],
      job_title: ['', [Validators.required]],
      company_name: ['', [Validators.required]],
      employees: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("[0-9]{11}"),
      Validators.minLength(10), Validators.maxLength(10)]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipcode: ['',],
      security_question: ['', [Validators.required]],
      answer: ['', [Validators.required]],
      subscription_type: [''],
      // recaptcha: ['', [Validators.required]]
    });

    this.registerForm.get('country')
      .valueChanges
      .pipe()
      .subscribe(countryId => {
        this.authService.getStatesList(countryId)
          .pipe()
          .subscribe(data => {
            this.statesList = data;
          })
      })
  }

  get regitsterFormControls() {
    return this.registerForm.controls;
  }


  isUserNameUnique(control: FormControl) {
    setTimeout(() => {
      this.authService.isUserNameRegisterd(control.value)
        .pipe()
        .subscribe(data => {
          console.log("dataaaa", data);
          this.usernameErrorMessage = 'Username Available'
          this.usernameError = false;
        }, err => {
          console.log("err", err);
          this.usernameError = true;
          if (err !== undefined)
            this.usernameErrorMessage = err.error.username_error;
        })
    }, 400)
  }

  onSubmit() {
    this.submitted = true;
    const userData = {
      salutation: this.registerForm.get('salutation').value,
      first_name: this.registerForm.get('first_name').value,
      last_name: this.registerForm.get('last_name').value,
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value,
      job_title: this.registerForm.get('job_title').value,
      company_name: this.registerForm.get('company_name').value,
      employees: this.registerForm.get('employees').value,
      email: this.registerForm.get('email').value,
      phone: this.registerForm.get('phone').value,
      country: this.registerForm.get('country').value,
      state: this.registerForm.get('state').value,
      zipcode: this.registerForm.get('zipcode').value,
      security_question: this.registerForm.get('security_question').value,
      subscription_type: this.registerForm.get('subscription_type').value,
      answer: this.registerForm.get('answer').value
    }
    this.authService.userRegister(userData).
      pipe().
      subscribe(res => {
        console.log(res);
        this.toastr.success('Successfully', 'User Registered', {
          timeOut: 1500
        });
        this.router.navigate(['/login']);
      }, error => {
        this.toastr.error('Try Again', 'Something went wrong', {
          timeOut: 1500
        });
      });
  }


  handleSuccess(e) {
    console.log("ReCaptcha", e);
  }


}
