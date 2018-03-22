import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NewsComponent } from './news.component';
import { NewsService } from '../services';

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
    NewsService
  ],
  bootstrap: [NewsComponent]
})
export class NewsModule { }