import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public user: User;
  // public menuItems: any[];

  constructor(public sidebarService: SidebarService, private userService: UserService) {
    // this.menuItems = this.sidebarService.menu;
    this.user = userService.user;
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();
  }


}
