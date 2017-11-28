import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SlideshowModule } from './slideshow/slideshow.module';
import { FacebookPostsModule } from './facebook/facebook.posts.module';
import { LinkedinPostsModule } from './linkedin/linkedin.posts.module';
import { MapsModule } from './maps/maps.module';
import { WeatherModule } from './weather/weather.module';
import { NavbarModule } from './navbar/navbar.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SlideshowModule,
    FacebookPostsModule,
    LinkedinPostsModule,
    MapsModule,
    WeatherModule,
    NavbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
