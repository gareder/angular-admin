import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

// declare function customSidebar();

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: User;

  constructor(private userService: UserService) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    // customSidebar();
  }

  logout() {
    this.userService.logout();
  }

}
