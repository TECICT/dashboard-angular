import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { UserService } from '../services';
import { User } from '../models';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements AfterViewInit {
    user: User = new User();
    hasPermission: boolean = false;

    public constructor(
      private userService: UserService,
    ) {}

    ngAfterViewInit() {
        setTimeout(() => {
          (<any>Object).assign(this.user, this.userService.getCurrentUser());
          if (this.user.role == 'admin') {
            this.hasPermission = true;
          } else {
            this.hasPermission = false
          }
        }, 100);
    }
}
