import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SettingsComponent } from './settings.component';

import { FileSelectDirective } from 'ng2-file-upload';

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
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    appRoutes,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    SettingsService,
    ApiService
  ],
  bootstrap: [SettingsComponent]
})
export class SettingsModule { }