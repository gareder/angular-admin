import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, type: 'users'|'medics'|'hospitals'): string {

    if (!img) {
      return `${ base_url }/uploads/users/no-img`;
    } else if (img.includes('https')) {
      return img;
    } else if (img) {
      return `${ base_url }/uploads/${ type }/${ img }`;
    } else {
      return `${ base_url }/uploads/users/no-img`;
    }

  }

}
