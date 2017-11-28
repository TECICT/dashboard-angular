import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NavbarComponent } from './navbar.component';
import { ClockService } from './clock.service';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    ClockService
  ],
  bootstrap: [NavbarComponent]
})
export class NavbarModule { }