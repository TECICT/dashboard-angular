import { Component } from '@angular/core';

import { Ng2MapComponent } from 'ng2-map';

@Component({
  selector: 'maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent {
  positions = [];
  
  showRandomMarkers() {
    let randomLat: number, randomLng: number;
    this.positions = [];
    for (let i = 0 ; i < 9; i++) {
      randomLat = Math.random() * 0.0099 + 43.7250;
      randomLng = Math.random() * 0.0099 + -79.7699;
      this.positions.push([randomLat, randomLng]);
    }
  }
  addMarker() {
    let randomLat = Math.random() * 0.0099 + 43.7250;
    let randomLng = Math.random() * 0.0099 + -79.7699;
    this.positions.push([randomLat, randomLng]);
  }
}
