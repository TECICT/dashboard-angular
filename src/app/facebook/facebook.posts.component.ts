import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams, AuthResponse, LoginResponse } from 'ngx-facebook';

@Component({
  selector: 'facebook-posts',
  templateUrl: './facebook.posts.component.html',
  styleUrls: ['./facebook.posts.component.css']
})
export class FacebookPostsComponent {
  fresponse = 'blabla';
  constructor(private fb: FacebookService) {

    const params: InitParams = {
      version: 'v2.9',
      appId: '888956744593194'
    };

    this.fb.init(params);
  }

  ngOnInit() {
    console.log(this.fresponse);
    
  }

  login() {
    this.fb.login()
    .then((response: LoginResponse) => {
        console.log('Logged in', response);
        this.getPosts();
    })
    .catch(e => console.error('Error logging in' + e));
  }

  getPosts() {
    this.fb.api('https://www.facebook.com/tec4talent/posts')
    .then(res => {
        this.fresponse = res;
        console.log(this.fresponse);
    })
    .catch(e => console.log(e));
  }
}
