import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { SearchesService } from '../../../services/searches.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public total: number = 0;
  public users: User[] = [];
  public currentPage: number = 0;
  // public loading: boolean = true;

  constructor(private userService: UserService, private searchServices: SearchesService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    // this.loading = true;
    this.userService.getUsers(this.currentPage).subscribe(({ total, users}) => {
      this.total = total;
      this.users = users;
      // this.loading = false;
    });
  }

  changePage(value: number) {
    this.currentPage += value;
    if (this.currentPage < 0) {
      this.currentPage = 0;
    } else if (this.currentPage >= this.total) {
      this.currentPage -= value;
    }
    this.getUsers();
  }

  search(searchQuery: string) {
    this.searchServices.search('users', searchQuery).subscribe(resuls => {
      this.users = resuls;
    });
  }

}
