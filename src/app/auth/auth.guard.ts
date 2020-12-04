import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot) {
        const allowedRoles = route.data.allowedRoles;
        const isAuthorized = this.authService.isAuthorized(allowedRoles);
        if (!isAuthorized) {
            this.router.navigate(['/landing']);
        }
        return isAuthorized;
    }
   
}
