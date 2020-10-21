import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { ModalImageService } from '../../../services/modal-image.service';
import { SearchesService } from '../../../services/searches.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  public total: number = 0;
  public users: User[] = [];
  public tempUsers: User[] = [];
  public currentPage: number = 0;
  // public loading: boolean = true;
  public searching = false; // to clear the register and get the users list
  public term = '';
  public imgSubs: Subscription;

  constructor(private userService: UserService, private searchService: SearchesService, private modalImageService: ModalImageService) { }

  ngOnInit(): void {
    this.getUsers();

    this.imgSubs = this.modalImageService.newImage.pipe(delay(200)).subscribe(img => this.getUsers());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
  getUsers() {
    // this.loading = true;
    this.userService.getUsers(this.currentPage).subscribe(({ total, users}) => {
      this.total = total;
      this.users = users;
      // this.loading = false;
      this.tempUsers = users;
      this.searching = false;
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
    this.term = searchQuery;
    if (searchQuery.length === 0) {
      return this.users = this.tempUsers;
    }

    this.searchService.search('users', this.term).subscribe(resuls => {
      this.searching = true;
      this.users = resuls;
    });
  }

  deleteUser(user: User) {
    if (user._id === this.userService.id) {
      return Swal.fire(
        'Error',
        `You can't delete yourself!`,
        'error'
      );
    }

    Swal.fire({
      title: 'Delete user?',
      text: `You will delete ${ user.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user).subscribe(() => {
          if (this.searching) {
            this.total -= 1;
            this.search(this.term);
          } else {
            this.getUsers();
          }
          Swal.fire(
            'Deleted!',
            `${ user.name } has been deleted`,
            'success'
          );
        });
      }
    });

  }

  changeRole(user: User) {
    this.userService.updateRole(user).subscribe(resp => console.log(resp));
  }

  openModal(user: User) {
    this.modalImageService.openModal('users', user._id, user.img);
  }

}
