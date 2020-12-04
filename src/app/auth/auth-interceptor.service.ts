import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = localStorage.getItem('role');
    const token = (localStorage.getItem('token'));
    if (currentUser == 'Admin') {
      console.log("check ?");  
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${token}`
        }
      });
    } 
    return next.handle(request);
  }
}
