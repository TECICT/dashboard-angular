import { Component, OnInit } from '@angular/core';

import { Ng2MapComponent } from 'ng2-map';

import { SettingsService } from '../services';

@Component({
  selector: 'maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit{ 
  location: string = 'Grimbergen, Brussel';

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.settingsService.get()
    .subscribe(settings => {
      this.location = settings.location_maps;
    });
  }
}
