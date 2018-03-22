import { NgModule } from '@angular/core';

import { ListErrorsComponent } from './list-errors.component';
import { ShowAuthedDirective } from './show-authed.directive';

@NgModule({
  imports: [
  ],
  declarations: [
    ListErrorsComponent,
    ShowAuthedDirective
  ],
  exports: [
    ListErrorsComponent,
    ShowAuthedDirective
  ]
})
export class ErrorModule {}
