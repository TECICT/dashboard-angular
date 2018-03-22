import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { ListComponent } from './list.component';
import { ListSettingsComponent } from './list-settings.component';
import { AddListTypeComponent } from './add-list-type.component';
import { ListService } from '../services';
import { ListTypeComponent } from './list-type.component';

const appRoutes: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'listsettings',
    component: ListSettingsComponent,
  },
  {
    path: 'listtypes',
    component: ListTypeComponent,
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
    ListTypeComponent
  ],
  imports: [
    BrowserModule,
    appRoutes,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ListComponent,
    ListSettingsComponent,
    AddListTypeComponent,
    ListTypeComponent
  ],
  providers: [
    ListService
  ],
  bootstrap: [
    ListComponent, 
    ListSettingsComponent,
    AddListTypeComponent,
    ListTypeComponent
  ]
})
export class ListModule { }