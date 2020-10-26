import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Hospital } from '../models/hospital.model';
import { Medic } from '../models/medic.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  private transformUsers(results: any[]): User[] {
    return results.map(user => new User(user.name, user.email, '', user.img, user.google, user.role, user._id));
  }

  private transformHospitals(results: any[]): Hospital[] {
    return results;
  }

  private transformMedics(results: any[]): Medic[] {
    return results;
  }

  search(type: 'users'|'medics'|'hospitals', searchQuery: string) {
    const url = `${ base_url }/all/collection/${ type }/${ searchQuery }`;
    return this.http.get<any[]>(url, this.headers).pipe(map((resp: any) => {
      switch (type) {
        case 'users':
          // To get the img from the users when searching
          return this.transformUsers(resp.results);

        case 'hospitals':
          // To get the img from the hospitals when searching
          return this.transformHospitals(resp.results);

        case 'medics':
          // To get the img from the users when searching
          return this.transformMedics(resp.results);

        default:
          return [];
      }
    }));
  }

}
