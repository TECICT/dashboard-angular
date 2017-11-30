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
  posts: string[] = [];
  postImages: string[] = [];

  public constructor(private _linkedInService: LinkedInService) {
  
  }

  ngOnInit() {
    console.log('init');
    this.subscribeToisInitialized();
  }

  getApiKeyFromSdkIN() {
    // Retrieve the API key used in the library through the SDK IN variable
    this.apiKey = this._linkedInService.getSdkIN().ENV.auth.api_key;
    console.log(this.apiKey);
  }

  subscribeToLogin(){
    this._linkedInService.login().subscribe({
      next: (state) => {
        // state will always return true when login completed 
      },
      complete: () => {
        // Completed
        console.log('login Linkedin complete');
        this.rawApiCall();     
      }
    });
  }

  public subscribeToisInitialized(){
    this._linkedInService.isInitialized$.subscribe({
      next: (state) => {
        // state will always return true when API finishes loading
      },
      complete: () => {
        this.getApiKeyFromSdkIN();
        this.subscribeToLogin();
      }
    });
  }

  rawApiCall() {
    let url ='/companies/18359028/updates';
    this._linkedInService.raw(url)
      .asObservable()
      .subscribe({
        next: (data) => {
          console.log(data);
          // this.parseData(data);
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

  parseData(data) {
    var total = data._total;
    if (total >= 5) {
      total = 5;
    }
    var i;
    for (i = 0; i < total; i++) {
        this.posts[i] = data.values[i].updateContent.companyStatusUpdate.share.comment
        if ('content' in data.values[i].updateContent.companyStatusUpdate.share) {
          this.postImages[i] = data.values[i].updateContent.companyStatusUpdate.share.content.eyebrowUrl
        }
    }
    console.log(this.posts);
    console.log(this.postImages);
  }
}
