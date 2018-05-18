import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MapsComponent } from './maps.component';
// import { Ng2MapModule } from 'ng2-map';
import { NguiMapModule} from '@ngui/map';

@NgModule({
  declarations: [
    MapsComponent
  ],
  imports: [
    BrowserModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBy560YsZb8wS98s7BX9hAbDHgANkflQ2U'})
    // Ng2MapModule.forRoot({
    //   apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBy560YsZb8wS98s7BX9hAbDHgANkflQ2U'
    // })
  ],
  exports: [
    MapsComponent
  ],
  providers: [
  ],
  bootstrap: [MapsComponent]
})
export class MapsModule { }