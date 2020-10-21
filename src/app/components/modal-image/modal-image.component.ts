import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalImageService } from '../../services/modal-image.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent implements OnInit {

  public uploadFile: File;
  public tempImg: any = null;

  constructor(public modalImageService: ModalImageService, public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  hideModal() {
    this.tempImg = null;
    this.modalImageService.closeModal();
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
    };
  }

  uploadImage() {
    const type = this.modalImageService.type;
    const id = this.modalImageService.id;

    this.fileUploadService.uploadImage(this.uploadFile, type, id).then(img => {
      Swal.fire('success', 'Profile image updated successfully', 'success');
      this.modalImageService.newImage.emit(img);
      this.hideModal();
    }).catch(err => {
      console.log(err);
      Swal.fire('Error', 'Error at trying to upload the image', 'error');
    });
  }


}
