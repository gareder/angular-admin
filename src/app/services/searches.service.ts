import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

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
    }
  }

  search(type: 'users'|'medics'|'hospitals', searchQuery: string,) {
    const url = `${ base_url }/all/collection/${ type }/${ searchQuery }`;
    return this.http.get<any[]>(url, this.headers).pipe(map((resp: any) => resp.results));
  }

}
