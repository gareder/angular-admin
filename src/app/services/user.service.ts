import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public auth2: any;
  public user: User;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get id(): string {
    return this.user.id || '';
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

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        // Getting all the user info
        const { email, google, img, name, role, _id: id } = resp.user;
        this.user = new User(name, email, '', img, google, role, id);
        // Renewed token
        localStorage.setItem('token', resp.token);
        return true;
      }),
      // Handling the error with the of to create an observable, so we don't break the code
      catchError(err => of(false))
    );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${ base_url }/users`, formData).pipe(tap((resp: any) => {
      localStorage.setItem('token', resp.token);
    }));
  }

  updateProfile(data: { email: string, name: string, role: string }) {

    data = {
      ...data,
      role: this.user.role
    }
    return this.http.put(`${ base_url }/users/${ this.id }`, data, {
      headers: {
        'x-token': this.token
      }
    });
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
