import { Component, Output, EventEmitter } from '@angular/core';
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
              opacity: 0,
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
  @Output() linkedinLoaded = new EventEmitter<boolean>();
  public isUserAuthenticated;
  private apiKey;
  posts: string[] = [];
  postImages: string[] = [];
  postNow: string = '';
  imageNow: string = '';
  imageNowPreload: string = '';
  linkedinError: boolean = false;
  showlogin: Boolean = true;
  private animationTimer;
  private linkedinTimer;
  private refreshTimer;
  private counter = 0;
  totalData = 0;

  public state = 'full';

  public constructor(
    private _linkedInService: LinkedInService,
  ) {}

  ngOnInit() {
    this.subscribeToisInitialized();

    this.linkedinTimer = Observable.timer(3600000, 3600000)
    this.linkedinTimer.subscribe((t) => this.rawApiCall());
    this.animationTimer = Observable.timer(0, 10000);
    this.animationTimer.subscribe((t) => this.toggleState());
    this.refreshTimer = Observable.timer(600000, 600000)
    this.refreshTimer.subscribe((t) => this.checkLinkedin());
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
          this.linkedinError = false;
          this.parseData(data);
        },
        error: (err) => {
          if (this.postNow) {
            this.rawApiCall();
            this.linkedinLoaded.emit(true);
          } else {
            this.linkedinError = true;
            this.linkedinLoaded.emit(true);
          }
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
        if ('companyStatusUpdate' in data.values[i].updateContent) {
            this.posts[i] = data.values[i].updateContent.companyStatusUpdate.share.comment;
            if ('content' in data.values[i].updateContent.companyStatusUpdate.share) {
              this.postImages[i] = data.values[i].updateContent.companyStatusUpdate.share.content.submittedImageUrl;
              if (this.posts[i].length > 200) {
                var substr1 = this.posts[i].substring(0,200);
                var substr2 = this.posts[i].substring(201);
                this.posts[i] = substr1 + substr2.substring(0, substr2.indexOf('.') < substr2.indexOf('!')? substr2.indexOf('.'): substr2.indexOf('!')) + "... Read more at linkedin.com/company/44163";
              }
            } else {
              this.postImages[i] = '';
              if (this.posts[i].length > 1000) {
                this.posts[i] = this.posts[i].substring(0,1000) + "...";
              }
            }
        } else if ('companyJobUpdate' in data.values[i].updateContent) {
            this.posts[i] = 'Vacature: ' + data.values[i].updateContent.companyJobUpdate.job.position.title;
            this.postImages[i] = '../../assets/job-offer.jpg';
        }
    }
    this.postNow = this.posts[0];
    this.imageNowPreload = this.postImages[0];
    this.linkedinLoaded.emit(true);

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
      if (this.imageNowPreload == this.postImages[this.counter]) {
        this.toggleState();
      }
      else {
        this.imageNowPreload = this.postImages[this.counter];
      }
      this.counter++;
    }
  }

  checkLinkedin() {
    if (this.posts.length == 0) {
      window.location.reload();
    }
  }

  imageLoaded(evt) {
    this.toggleState();
  }
}
