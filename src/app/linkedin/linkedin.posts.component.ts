import { Component } from '@angular/core';
import { LinkedInService } from 'angular-linkedin-sdk';
import { Observable } from 'rxjs';

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
  postNow: string = '';
  imageNow: string = '';
  showlogin: Boolean = true;
  private timer;
  private counter = 0;
  totalData = 0;

  public constructor(private _linkedInService: LinkedInService) {
  
  }

  ngOnInit() {
    console.log('init');
    this.subscribeToisInitialized();

    this.timer = Observable.timer(0, 10000);
    this.timer.subscribe((t) => this.onTimeOut());
  }

  getApiKeyFromSdkIN() {
    // Retrieve the API key used in the library through the SDK IN variable
    this.apiKey = this._linkedInService.getSdkIN().ENV.auth.api_key;
    console.log(this.apiKey);
  }

  subscribeToLogin(){
    console.log('subscribetologin');
    this._linkedInService.login().subscribe({
      next: (state) => {
        // state will always return true when login completed
        console.log('hello');
      },
      complete: () => {
        // Completed
        console.log('login Linkedin complete');
        this.showlogin = false;
        this.rawApiCall();     
      }
    });
  }

  public subscribeToLogout(){
    this._linkedInService.logout().subscribe({
      next: () => {
        // does not emit a value 
      },
      complete: () => {
        console.log('logged out');
        // Completed
      }
    });
  }

  subscribeToisInitialized(){
    console.log('subscribeToisInitialized');
    this._linkedInService.isInitialized$.subscribe({
      next: (state) => {
        // state will always return true when API finishes loading
      },
      complete: () => {
        // this.getApiKeyFromSdkIN();
        this.subscribeToLogin();
      }
    });
  }

  rawApiCall() {
    let url ='/companies/44163/updates';
    this._linkedInService.raw(url)
      .asObservable()
      .subscribe({
        next: (data) => {
          console.log(data);
          this.parseData(data);
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
    this.totalData = data._total;
    if (this.totalData >= 5) {
      this.totalData = 5;
    }
    var i;
    for (i = 0; i < this.totalData; i++) {
        this.posts[i] = data.values[i].updateContent.companyStatusUpdate.share.comment
        if ('content' in data.values[i].updateContent.companyStatusUpdate.share) {
          this.postImages[i] = data.values[i].updateContent.companyStatusUpdate.share.content.submittedImageUrl
        } else {
          this.postImages[i] = '';
        }
    }
    this.postNow = this.posts[0];
    this.imageNow = this.postImages[0];
  }

  onTimeOut() {
    if (this.counter >= this.totalData) {
      this.counter = 0;
    }
    this.postNow = this.posts[this.counter];
    this.imageNow = this.postImages[this.counter];
    console.log(this.imageNow);
    this.counter++;
  }
}
