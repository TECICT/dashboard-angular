import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LinkedinPostsComponent } from './linkedin.posts.component';
import { LinkedInSdkModule } from 'angular-linkedin-sdk';

@NgModule({
  declarations: [
    LinkedinPostsComponent
  ],
  imports: [
    BrowserModule,
    LinkedInSdkModule
  ],
  exports: [
    LinkedinPostsComponent
  ],
  providers: [
    // Inject apiKey and, optionally, authorize to integrate with LinkedIN official API
    { provide: 'apiKey', useValue: '86zag1txx9snbt'},
    { provide: 'authorize', useValue: 'false'},
    { provide: 'isServer', useValue: 'false'}
  ],
  bootstrap: [LinkedinPostsComponent]
})
export class LinkedinPostsModule { }