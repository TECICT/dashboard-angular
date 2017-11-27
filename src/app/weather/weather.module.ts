import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { WeatherComponent } from './weather.component';
import { WeatherService } from './weather.service';


@NgModule({
  declarations: [
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  exports: [
    WeatherComponent
  ],
  providers: [
    WeatherService
  ],
  bootstrap: [WeatherComponent]
})
export class WeatherModule { }