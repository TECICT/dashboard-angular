import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { ListComponent } from './list.component';
import { ListSettingsComponent } from './list-settings.component';
import { AddListTypeComponent } from './add-list-type.component';
import { ListService } from '../services';
import { MatCheckboxModule, MatInputModule } from '@angular/material';

const appRoutes: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'listsettings',
    component: ListSettingsComponent,
  },
  {
    path: 'addlisttype',
    component: AddListTypeComponent,
  }
]);

@NgModule({
  declarations: [
    ListComponent,
    ListSettingsComponent,
    AddListTypeComponent,
  ],
  imports: [
    BrowserModule,
    appRoutes,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule
  ],
  exports: [
    ListComponent,
    ListSettingsComponent,
    AddListTypeComponent,
  ],
  providers: [
    ListService
  ],
  bootstrap: [
    ListComponent,
    ListSettingsComponent,
    AddListTypeComponent,
  ]
})
export class ListModule { }