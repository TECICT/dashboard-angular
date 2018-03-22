import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { SlideshowModule } from '../slideshow/slideshow.module';
import { FacebookPostsModule } from '../facebook/facebook.posts.module';
import { LinkedinPostsModule } from '../linkedin/linkedin.posts.module';
import { MapsModule } from '../maps/maps.module';
import { WeatherModule } from '../weather/weather.module';
import { NavbarModule } from '../navbar/navbar.module';
import { NewsModule } from '../news/news.module';

const appRoutes: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  }
]);

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    SlideshowModule,
    FacebookPostsModule,
    LinkedinPostsModule,
    MapsModule,
    WeatherModule,
    NavbarModule,
    NewsModule,
    appRoutes
  ],
  providers: [],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }