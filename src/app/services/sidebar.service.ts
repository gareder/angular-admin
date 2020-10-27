import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  getMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }

  // menu: any[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       { title: 'Main', url: '/' },
  //       { title: 'Progress Bar', url: 'progress' },
  //       { title: 'Charts', url: 'chart1' },
  //       { title: 'Promises', url: 'promises' },
  //       { title: 'Rxjs', url: 'rxjs' },
  //     ]
  //   },
  //   {
  //     title: 'Maintenance',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { title: 'Users', url: 'users' },
  //       { title: 'Hospitals', url: 'hospitals' },
  //       { title: 'Medics', url: 'medics' },
  //     ]
  //   }
  // ];

}
