import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private userService: UserService, private router: Router) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    // customSidebar();
  }

  logout() {
    this.userService.logout();
  }

  search(searchQuery: string) {
    if (searchQuery.trim().length === 0) {
      return;
    }
    this.router.navigateByUrl(`/dashboard/search/${ searchQuery }`);
  }

}
