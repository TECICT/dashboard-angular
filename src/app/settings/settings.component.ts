import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { FormBuilder, FormGroup } from '@angular/forms';

import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../environments/environment';

import { SettingsService, UserService } from '../services';
import { User, Settings } from '../models';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements AfterViewInit, OnInit {
    public uploader:FileUploader = new FileUploader({
      url: environment.api_url + '/video/upload',
      allowedMimeType: ['video/mp4']
    });
    settings: Settings = new Settings();
    user: User = new User();
    userSettingsForm: FormGroup;
    labelVal: String = 'Choose a file';
    noChanges: Boolean = true;
    isSubmitting: boolean = false;
    hasPermission: boolean = false;

    public constructor(
      private settingsService: SettingsService,
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

    ngAfterViewInit() {
        this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
        setTimeout(() => {
          (<any>Object).assign(this.user, this.userService.getCurrentUser());
          this.userSettingsForm.patchValue(this.user);
          if (this.user.role == 'admin') {
            this.hasPermission = true;
          } else {
            this.hasPermission = false
          }
        }, 100);
    }

    onFileSelected(input) {
        
        if (this.uploader.queue.length > 1) {
            this.uploader.queue[0].remove();
        }
        this.labelVal = this.uploader.queue[0].file.name;
    }

    ngOnInit() {
      this.settingsService.get()
        .subscribe(settings => {
          this.settings = settings;
          console.log('this.settings');
          console.log(this.settings);
        },
        err => {
          this.router.navigateByUrl('/')
        })
        ;
    }

    clearButton() {
      this.labelVal = 'Choose a file';
    }

    submitForm() {
      this.settingsService.save(this.settings)
        .subscribe(settings => {
          console.log('Settings were saved');
          this.noChanges = true;
        })
    }

    submitUserForm() {
      this.isSubmitting = true;
      // update the model
      this.updateUser(this.userSettingsForm.value);

      this.userService
      .update(this.user)
      .subscribe(
        updatedUser => {
          this.router.navigateByUrl('settings');
          this.isSubmitting = false;
        },
        err => {
          this.isSubmitting = false;
        }
      );
    }

    updateUser(values: Object) {
      (<any>Object).assign(this.user, values);
    }

    enableSave() {
      this.noChanges = false;
    }

    logout() {
      this.userService.purgeAuth();
      this.router.navigateByUrl('/');
    }
}
