import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public user: User;
  public uploadFile: File;
  public tempImg: any = null;

  constructor(private fb: FormBuilder, private userService: UserService, private fileUploadService: FileUploadService) {
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
        text: 'Profile updated successfully',
        icon: 'success'
      });
    }, (err) => {
      Swal.fire({
        title: 'Error',
        text: err.error.msg,
        icon: 'error'
      });
    });
  }

  changeImage(file: File) {
    this.uploadFile = file;
    if (!file) {
      // If there's no image, we set the temp to null to make sure it won't show on the view
      return this.tempImg = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.tempImg = reader.result;
    }
  }

  uploadImage() {
    this.fileUploadService.uploadImage(this.uploadFile, 'users', this.user.id).then(img => {
      this.user.img = img;
      Swal.fire({
        title: 'Success',
        text: 'Profile image updated successfully',
        icon: 'success'
      }).catch(err => {
        console.log(err);
        Swal.fire({
          title: 'Error',
          text: 'Error at trying to upload the image',
          icon: 'error'
        });
      });
    });
  }

}
