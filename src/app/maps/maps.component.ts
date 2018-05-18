import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { SettingsService } from '../services';

@Component({
  selector: 'maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit{
  @Output() mapsLoaded = new EventEmitter<boolean>();
  location: string = 'Grimbergen, Brussel';
  private mapsTimer;

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.mapsTimer = Observable.timer(0, 60000);
    this.mapsTimer.subscribe((t) => this.getLocation());
  }

  getLocation() {
    this.settingsService.get()
    .subscribe(
      settings => {
        this.location = settings.location_maps;
      },
      error => {
        this.getLocation();
      }
    );
  }

  onMapReady(map) {
    console.log('map ready');
    console.log(map);
    this.mapsLoaded.emit(true);
  }
}
