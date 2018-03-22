import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '../services';
import { User } from '../models';

@Component({
  selector: 'user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class UserSettingsComponent implements OnInit {
    user: User = new User();
    userSettingsForm: FormGroup;

    public constructor(
      private router: Router,
      private userService: UserService,
      private fb: FormBuilder
    ) {
      this.userSettingsForm = this.fb.group({
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        password: ''
      });
    }

    ngOnInit() {
      setTimeout(() => {
        (<any>Object).assign(this.user, this.userService.getCurrentUser());
        this.userSettingsForm.patchValue(this.user);
      }, 100);
    }

    submitUserForm() {
      // update the model
      this.updateUser(this.userSettingsForm.value);

      this.userService
      .update(this.user)
      .subscribe(
        updatedUser => {
          this.router.navigateByUrl('settings');
        },
        err => {
        }
      );
    }

    updateUser(values: Object) {
      (<any>Object).assign(this.user, values);
    }

    logout() {
      this.userService.purgeAuth();
      this.router.navigateByUrl('/');
    }
}
