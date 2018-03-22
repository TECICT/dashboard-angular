import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { FormGroup } from '@angular/forms';

import { SettingsService } from '../services';
import { Settings } from '../models';

@Component({
  selector: 'location-settings',
  templateUrl: './location-settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class LocationSettingsComponent implements OnInit {
    settings: Settings = new Settings();
    noChanges: Boolean = true;

    public constructor(
      private settingsService: SettingsService,
      private router: Router,
    ) {}

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
}
