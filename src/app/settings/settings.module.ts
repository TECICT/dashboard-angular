import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorModule } from '../errors/error.module';

import { SettingsComponent } from './settings.component';
import { SlideshowSettingsComponent } from './slideshow-settings.component';
import { LocationSettingsComponent } from './location-settings.component';
import { UserSettingsComponent } from './user-settings.component';
import { PermissionsComponent } from './permissions.component';

import { FileUploadModule } from 'ng2-file-upload';

import { SettingsService, ApiService } from '../services';

const appRoutes: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'settings',
    component: SettingsComponent,
  }
]);

@NgModule({
  declarations: [
    SettingsComponent,
    SlideshowSettingsComponent,
    LocationSettingsComponent,
    UserSettingsComponent,
    PermissionsComponent
  ],
  imports: [
    BrowserModule,
    appRoutes,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    ErrorModule
  ],
  providers: [
    SettingsService,
    ApiService
  ],
  bootstrap: [SettingsComponent]
})
export class SettingsModule { }