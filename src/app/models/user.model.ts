import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class User {

  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public id?: string,
  ) {}

  get imgUrl() {

    if (!this.img) {
      return `${ base_url }/uploads/users/no-img`;
    } else if (this.img.includes('https')) {
      return this.img;
    } else if (this.img) {
      return `${ base_url }/uploads/users/${ this.img }`;
    } else {
      return `${ base_url }/uploads/users/no-img`;
    }

  }

}