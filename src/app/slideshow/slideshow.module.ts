import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SlideshowComponent } from './slideshow.component';

@NgModule({
  declarations: [
    SlideshowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    SlideshowComponent
  ],
  providers: [],
  bootstrap: [SlideshowComponent]
})
export class SlideshowModule { }