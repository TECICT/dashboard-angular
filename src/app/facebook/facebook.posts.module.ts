import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FacebookPostsComponent } from './facebook.posts.component';
import { FacebookModule } from 'ngx-facebook';

@NgModule({
  declarations: [
    FacebookPostsComponent
  ],
  imports: [
    BrowserModule,
    FacebookModule.forRoot()
  ],
  exports: [
    FacebookPostsComponent
  ],
  providers: [],
  bootstrap: [FacebookPostsComponent]
})
export class FacebookPostsModule { }