import { Component } from '@angular/core';
import { LinkedInService } from 'angular-linkedin-sdk';

@Component({
  selector: 'linkedin-posts',
  templateUrl: './linkedin.posts.component.html',
  styleUrls: ['./linkedin.posts.component.css']
})
export class LinkedinPostsComponent {
  public isUserAuthenticated;
  private apiKey;
  public constructor(private _linkedInService: LinkedInService) {
  
  }

  ngOnInit() {
    console.log('init');
  }

  getApiKeyFromSdkIN() {
    // Retrieve the API key used in the library through the SDK IN variable
    this.apiKey = this._linkedInService.getSdkIN().ENV.auth.api_key;
  }

  subscribeToLogin(){
    this._linkedInService.login().subscribe({
      next: (state) => {
        // state will always return true when login completed 
        this.rawApiCall();
      },
      complete: () => {
        // Completed
        
      }
    });
  }

  rawApiCall() {
    console.log('rawApiCall()');
    let url ='/companies/18359028';
    this._linkedInService.raw(url)
      .asObservable()
      .subscribe({
        next: (data) => {
          console.log('check');
          console.log(data);
        },
        error: (err) => {
          console.log('error');
          console.log(err);
        },
        complete: () => {
          console.log('RAW API call completed');
        }
      });
  }
}
