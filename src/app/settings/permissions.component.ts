import { Component, OnInit } from '@angular/core';

import { UserService } from '../services';
import { User } from '../models';

@Component({
  selector: 'permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./settings.component.css']
})
export class PermissionsComponent implements OnInit {

    allUsers: User[];
    adminUsers: User[] = [];
    guestUsers: User[] = [];

    public constructor(
      private userService: UserService
    ) {}

    ngOnInit() {
      this.userService.getAllUsers()
      .subscribe(
        users => {
          this.allUsers = users.users;
          var user: User;
          this.allUsers.forEach(
            (user) => {
              if (user.role == 'admin') {
                this.adminUsers.push(user);
              } else {
                this.guestUsers.push(user);
              }
            }
          )
          console.log(this.guestUsers);
        }
      )
    }
}
