import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NewsComponent } from './news.component';

@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  exports: [
    NewsComponent
  ],
  providers: [
    
  ],
  bootstrap: [NewsComponent]
})
export class NewsModule { }