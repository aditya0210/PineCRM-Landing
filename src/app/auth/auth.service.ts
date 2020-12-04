import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public currentUserSubject: BehaviorSubject<boolean>;
  public currentUser: Observable<boolean>;

  public blogCommentLoginSubject = new BehaviorSubject<any>({ isLogin: false, blogId: 0, logout: false })

  public blogCommentLogin = this.blogCommentLoginSubject.asObservable()

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService) {
  }

  public get currentUserValue(): boolean {
    this.currentUserSubject = new BehaviorSubject<boolean>(this.getBooleanValue());
    this.currentUser = this.currentUserSubject.asObservable();
    return this.currentUserSubject.value;
  }

  addComment(data) {
    this.blogCommentLoginSubject.next(data)
  }


  getBooleanValue() {
    return !!(localStorage.getItem('token'));
  }


  isUserNameRegisterd(userName: string) {
    return this.http.post(environment.baseUrl + 'usernameurl/', {
      "username": userName
    })
  }

  getCountriesList() {
    return this.http.get<any>(environment.baseUrl + 'country/')
  }

  getStatesList(id) {
    return this.http.get<any>(environment.baseUrl + 'state/?country=' + id)
  }

  forgotPassword(email) {
    return this.http.post(environment.baseUrl + 'password-reset/', {
      "email": email
    });
  }

  login(data): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'auth/login/', data).pipe(map(res => {
      localStorage.setItem('userDetails', JSON.stringify(res));
      localStorage.setItem('token', res.key);
      if (res.user.is_superuser) {
        localStorage.setItem('role', 'Admin');
      }
      else {
        localStorage.setItem('role', 'User');
      }
      return res;
    }));
  }

  isAuthorized(allowedRoles: string[]): boolean {
    // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }
    // get token from local storage or state management
    const token = localStorage.getItem('token');
    // decode token to read the payload details
    // const decodeToken = this.jwtHelperService.decodeToken(token);
    // check if it was decoded successfully, if not the token is not valid, deny access
    if (!token) {
      console.log('Invalid token');
      return false;
    }

    // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
    // return allowedRoles.includes(decodeToken['role']);
    const role = localStorage.getItem('role');
    return allowedRoles.includes(role);
  }

  userRegister(data) {
    return this.http.post<any>(environment.baseUrl + 'register/', {
      "admin": {
        "salutation": data.salutation,
        "username": data.username,
        "first_name": data.first_name,
        "last_name": data.last_name,
        "email": data.email,
        "phone": data.phone,
        "password": data.password
      },
      "job_title": data.job_title,
      "country": data.country,
      "state": data.state,
      "zip_code": data.zipcode,
      "subscription_type": 1,
      "security_question": "2",
      "answer": data.answer,
      "company_name": "1"
    }
    );
  }

  logOut() {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
    // this.blogCommentLoginSubject.next(data)
    this.toastr.success('Successfully', 'Log Out', {
      timeOut: 1500
    });
    // window.location.reload();
    this.addComment({ isLogin: false, blogId: 0, logout: true });
  }

}
