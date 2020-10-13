import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators'
import { environment } from '../../environments/environment.prod';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public auth2: any;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
  }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      // ngZone 'cause the auth2.signOut is doing the routing for a moment, so angular gives a warming about it
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  googleInit() {

    return new Promise(resolve => {

      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '14472313339-mm8edp71pgu8o465f14m6krmrv7fqkeo.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });

    });
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
      // Renewed token
      localStorage.setItem('token', resp.token);
      }),
      // We need to transfor the resp to a boolean
      map(resp => true),
      // Handling the error with the of to create an observable, so we don't break the code
      catchError(err => of(false))
    );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${ base_url }/users`, formData).pipe(tap((resp: any) => {
      localStorage.setItem('token', resp.token);
    }));
  }

  login(formData: LoginForm) {
    return this.http.post(`${ base_url }/login`, formData).pipe(tap((resp: any) => {
      localStorage.setItem('token', resp.token);
    }));
  }

  loginGoogle(token) {
    return this.http.post(`${ base_url }/login/google`, { token }).pipe(tap((resp: any) => {
      localStorage.setItem('token', resp.token);
    }));
  }

}
