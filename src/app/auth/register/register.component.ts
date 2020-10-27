import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
    terms: [false, Validators.requiredTrue]
  }, {
    validators: this.matchingPasswords('password', 'password2') // Sending the fields we wanna validate
  });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  registerUser() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return ;
    }

    // POST the form
    this.userService.createUser(this.registerForm.value).subscribe(resp => {
      // Moving to dashboard once login is successfull
      this.router.navigateByUrl('/');
    }, (err) => {
      Swal.fire({
        title: 'Error',
        text: err.error.msg,
        icon: 'error'
      });
    });
  }

  invalidField(field: string): boolean {
    if (this.registerForm.get(field).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  invalidPasswords() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  acceptTerms() {
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }

  matchingPasswords(password: string, password2: string) {

    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(password);
      const pass2Control = formGroup.get(password2);
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noMatchingPasswords: true });
      }
    }

  }

}
