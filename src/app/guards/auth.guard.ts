import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private userService: UserService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return this.userService.validateToken().pipe(tap(isAuth => {
      if (!isAuth) {
        this.router.navigateByUrl('/login');
      }
    }));
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      // The service will return a boolean
      return this.userService.validateToken().pipe(tap(isAuth => {
        if (!isAuth) {
          this.router.navigateByUrl('/login');
        }
      }));
  }

}
