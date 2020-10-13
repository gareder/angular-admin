import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [localStorage.getItem('remember') || false]
  });

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe(resp => {

      if (this.loginForm.get('remember').value) {
        localStorage.setItem('email', this.loginForm.get('email').value);
        localStorage.setItem('remember', this.loginForm.get('remember').value);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('remember');
      }
      // Moving to dashboard once login is successfull
      this.router.navigateByUrl('/');
    }, (err) => {
      console.log(err);
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp();
  }

  async startApp() {
    await this.userService.googleInit();
    this.auth2 = this.userService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.userService.loginGoogle(id_token).subscribe(resp => {
          // Moving to dashboard once login is successfull
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          });
        });

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
