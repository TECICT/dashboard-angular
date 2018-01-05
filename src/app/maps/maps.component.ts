import { Component, OnInit } from '@angular/core';

import { Ng2MapComponent } from 'ng2-map';
import { Observable } from 'rxjs';

import { SettingsService } from '../services';

@Component({
  selector: 'maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit{ 
  location: string = 'Grimbergen, Brussel';
  private mapsTimer;

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.mapsTimer = Observable.timer(0, 60000);
    this.mapsTimer.subscribe((t) => this.getLocation());
  }

  getLocation() {
    this.settingsService.get()
    .subscribe(settings => {
      this.location = settings.location_maps;
    });
  }
}
