import { Component, OnInit } from '@angular/core';

import { UserService } from '../services';
import { User } from '../models';

import { CompleterService, CompleterData } from 'ng2-completer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./settings.component.css']
})
export class PermissionsComponent implements OnInit {

    allUsers: User[];
    adminUsers: User[] = [];
    guestUsers: User[] = [];

    public query;
    public filteredList = [];
    public selectedUser: User = new User();
    public adminSelected: Boolean = false;

    public searchStr: string;
    public dataService: CompleterData;
    public searchData = ['red', 'green', 'blue', 'cyan', 'magenta', 'yellow', 'black'];

    public constructor(
      private userService: UserService,
      private completerService: CompleterService
    ) {
      this.dataService = completerService.local(this.guestUsers, 'fullname', 'fullname');
    }

    ngOnInit() {
      this.populateUsers();
    }

    populateUsers() {
      this.userService.getAllUsers()
      .subscribe(
        users => {
          this.allUsers = users.users;
          var user: User;
          this.allUsers.forEach(
            (user) => {
              user['fullname'] = user.firstname + " " + user.lastname;
              if (user.role == 'admin') {
                this.adminUsers.push(user);
              } else {
                this.guestUsers.push(user);
              }
            }
          )
          console.log(this.allUsers);
        }
      )
    }

    onSelected(item: any) {
      this.selectedUser = item.originalObject;
      this.adminSelected = true;
    }

    makeAdmin(user) {
      this.userService.makeAdmin(user.username)
      .subscribe(
        answer => {
          this.adminSelected = false;
          this.selectedUser = new User;
          this.guestUsers = [];
          this.adminUsers = [];
          this.dataService = this.completerService.local(this.guestUsers, 'fullname', 'fullname');
          this.populateUsers();
        }
      );
      
    }

    makeGuest(user) {
      this.userService.makeGuest(user.username)
      .subscribe(
        answer => {
          this.guestUsers = [];
          this.adminUsers = [];
          this.dataService = this.completerService.local(this.guestUsers, 'fullname', 'fullname');
          this.populateUsers();
        }
      );
      
    }
}
