import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SlideshowComponent } from './slideshow.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    SlideshowComponent
  ],
  imports: [
    BrowserModule,
    PdfViewerModule,
    FormsModule
  ],
  exports: [
    SlideshowComponent
  ],
  providers: [],
  bootstrap: [SlideshowComponent]
})
export class SlideshowModule { }