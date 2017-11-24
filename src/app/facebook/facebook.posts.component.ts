import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams, AuthResponse, LoginResponse, UIResponse, UIParams } from 'ngx-facebook';

@Component({
  selector: 'facebook-posts',
  templateUrl: './facebook.posts.component.html',
  styleUrls: ['./facebook.posts.component.css']
})
export class FacebookPostsComponent {
  
  postlink = '';

  constructor(private fb: FacebookService) {

    const params: InitParams = {
      version: 'v2.9',
      appId: '888956744593194'
    };

    this.fb.init(params);
    
  }

  ngOnInit() {
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
      var fresponse = res;
      console.log(fresponse);
      console.log(fresponse.data[0].id);
      this.postlink = 'https://www.facebook.com/' + fresponse.data[1].id;
      this.fb.api('https://www.facebook.com/' + fresponse.data[1].id + '/attachments')
      .then(res => {
        console.log(res);
      })
      .catch(e => console.error(e));
    })
    .catch(e => console.log(e));
  }
}
