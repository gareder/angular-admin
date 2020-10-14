import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public user: User;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required ],
      email: [this.user.email, [ Validators.required, Validators.email ] ],
    });
  }

  updateProfile() {
    this.userService.updateProfile(this.profileForm.value).subscribe((resp: any) => {
      const { name, email } = resp.user;
      this.user.name = name;
      this.user.email = email;
      Swal.fire({
        title: 'Success',
        text: 'Profile update successfully',
        icon: 'success'
      });
    });
  }

}
