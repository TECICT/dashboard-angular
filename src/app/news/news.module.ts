import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { NewsComponent } from './news.component';

@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  exports: [
    NewsComponent
  ],
  providers: [
    
  ],
  bootstrap: [NewsComponent]
})
export class NewsModule { }