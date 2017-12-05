import { Component } from '@angular/core';
import { LinkedInService } from 'angular-linkedin-sdk';
import { Observable } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'linkedin-posts',
  templateUrl: './linkedin.posts.component.html',
  styleUrls: ['./linkedin.posts.component.css'],
  animations: [
      trigger('newLinkedinItem', [
          state('middle', style({
              opacity: 0
          })),
          state('full' , style({
              opacity: 1
          })),

          transition('middle => full', animate('500ms 500ms ease-in')),
          transition('full => middle', animate('500ms ease-out')),
      ]),
  ]
})
export class LinkedinPostsComponent {
  public isUserAuthenticated;
  private apiKey;
  posts: string[] = [];
  postImages: string[] = [];
  postNow: string = '';
  imageNow: string = '';
  showlogin: Boolean = true;
  private animationTimer;
  private linkedinTimer;
  private counter = 0;
  totalData = 0;

  public state = 'full';

  public constructor(private _linkedInService: LinkedInService) {
  
  }

  ngOnInit() {
    this.subscribeToisInitialized();

    this.linkedinTimer = Observable.timer(3600000, 3600000)
    this.linkedinTimer.subscribe((t) => this.rawApiCall());
    this.animationTimer = Observable.timer(0, 10000);
    this.animationTimer.subscribe((t) => this.toggleState());
  }

  getApiKeyFromSdkIN() {
    // Retrieve the API key used in the library through the SDK IN variable
    this.apiKey = this._linkedInService.getSdkIN().ENV.auth.api_key;
  }

  subscribeToLogin(){
    this._linkedInService.login().subscribe({
      next: (state) => {
        // state will always return true when login completed
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
        console.log('linkedin logged out');
        // Completed
      }
    });
  }

  subscribeToisInitialized(){
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

  toggleState() {
      this.state = this.state === 'middle' ? 'full' : 'middle';
  }

  setNewItem() {
    if (this.state == 'middle') {
      if (this.counter >= this.totalData) {
        this.counter = 0;
      }
      this.postNow = this.posts[this.counter];
      this.imageNow = this.postImages[this.counter];
      this.counter++;
      this.toggleState();
    }
  }
}
