import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  // tslint:disable-next-line: variable-name
  private _hideModalFlag = true;
  public type: 'users'|'medics'|'hospitals';
  public id: string;
  public img: string;
  public newImage: EventEmitter<string> = new EventEmitter<string>();

  get hideModal() {
    return this._hideModalFlag;
  }

  openModal(type: 'users'|'medics'|'hospitals', id: string, img: string = 'no-img') {
    this._hideModalFlag = false;
    this.type = type;
    this.id = id;
    // this.img = img;
    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${ base_url }/uploads/${ type }/${ img }`;
    }

  }

  closeModal() {
    this._hideModalFlag = true;
  }

  constructor() { }
}
