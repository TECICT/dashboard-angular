import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SlideshowModule } from './slideshow/slideshow.module';
import { FacebookPostsModule } from './facebook/facebook.posts.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SlideshowModule,
    FacebookPostsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
