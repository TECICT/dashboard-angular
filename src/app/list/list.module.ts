import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ErrorModule } from '../errors/error.module';

import { ListComponent } from './list.component';
import { ListSettingsComponent } from './list-settings.component';
import { ListHighlighterComponent } from './list-highlighter.component';
import { AddListTypeComponent } from './add-list-type.component';
import { ListService } from '../services';
import { MatCheckboxModule, MatInputModule, MatButtonModule, MatSelectModule } from '@angular/material';

const appRoutes: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'listsettings',
    component: ListSettingsComponent,
  },
  {
    path: 'addlisttype',
    component: AddListTypeComponent,
  },
  {
    path: 'addlisttype/:id',
    component: AddListTypeComponent,
  }
]);

@NgModule({
  declarations: [
    ListComponent,
    ListSettingsComponent,
    AddListTypeComponent,
    ListHighlighterComponent
  ],
  imports: [
    BrowserModule,
    appRoutes,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ErrorModule
  ],
  exports: [
    ListComponent,
    ListSettingsComponent,
    AddListTypeComponent,
    ListHighlighterComponent,
  ],
  providers: [
    ListService
  ],
  bootstrap: [
    ListComponent,
    ListSettingsComponent,
    AddListTypeComponent,
    ListHighlighterComponent,
  ]
})
export class ListModule { }