import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LinkedinPostsComponent } from './linkedin.posts.component';
import { LinkedInSdkModule } from 'angular-linkedin-sdk';
import { LinkyModule } from 'angular-linky';

@NgModule({
  declarations: [
    LinkedinPostsComponent
  ],
  imports: [
    BrowserModule,
    LinkedInSdkModule,
    LinkyModule,
    BrowserAnimationsModule
  ],
  exports: [
    LinkedinPostsComponent
  ],
  providers: [
    // Inject apiKey and, optionally, authorize to integrate with LinkedIN official API
    { provide: 'apiKey', useValue: '86zag1txx9snbt'},
    { provide: 'authorize', useValue: 'true'},
    { provide: 'isServer', useValue: 'true'}
  ],
  bootstrap: [LinkedinPostsComponent]
})
export class LinkedinPostsModule { }