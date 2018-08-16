import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../environments/environment';

import { SettingsService } from '../services';
import { Settings } from '../models';

@Component({
  selector: 'slideshow-settings',
  templateUrl: './slideshow-settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SlideshowSettingsComponent implements AfterViewInit, OnInit {
    public uploader:FileUploader = new FileUploader({
      url: environment.api_url + '/video/upload',
      allowedMimeType: ['video/mp4', 'image/jpeg', 'image/png']
    });
    settings: Settings = new Settings();
    labelVal: String = 'Choose a file';
    noChanges: Boolean = true;
    isSubmitting: boolean = false;

    public constructor(
      private settingsService: SettingsService,
      private router: Router,
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
        },
        err => {
          this.router.navigateByUrl('/')
        })
        ;
    }

    clearButton() {
      this.labelVal = 'Choose a file';
    }

}
