import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { FormGroup } from '@angular/forms';

import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../environments/environment';

import { SettingsService, UserService } from '../services';
import { Settings } from '../models';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements AfterViewInit, OnInit{
    public uploader:FileUploader = new FileUploader({
      url: environment.api_url + '/video/upload',
      allowedMimeType: ['video/mp4']
    });
    settings: Settings = new Settings();
    labelVal: String = 'Choose a file';
    noChanges: Boolean = true;

    public constructor(
      private settingsService: SettingsService,
      private router: Router,
      private userService: UserService,
    ) {}

    ngAfterViewInit() {
        this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
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

    enableSave() {
      this.noChanges = false;
    }

    logout() {
      this.userService.purgeAuth();
      this.router.navigateByUrl('/');
    }
}
