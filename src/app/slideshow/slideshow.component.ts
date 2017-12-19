import { Component, OnInit, ViewChild } from '@angular/core';

import { environment } from '../../environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { Observable } from 'rxjs';

import { SettingsService } from '../services';

@Component({
  selector: 'slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit{
  src: String = "";
  private slideshowTimer;

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
      // this.src = environment.api_url + '/video';
      
      this.slideshowTimer = Observable.timer(0, 10000);
      this.slideshowTimer.subscribe((t) => this.changeSource());
  }

  changeSource() {
    console.log('test changesource');
      this.settingsService.get()
      .subscribe(settings => {
        if (this.src !== environment.api_url + '/video/' + settings.video.split('/').pop()) {
          console.log('video change');
          console.log(environment.api_url + '/video/' + settings.video.split('/').pop());
          this.src = environment.api_url + '/video/' + settings.video.split('/').pop();
          this.loadVideo();
        }
      });
  }

  loadVideo() {
    console.log('reloading video');
      var videoHTML = document.getElementById('videoplayer');
      var video = <HTMLVideoElement> videoHTML;
      video = videoHTML as HTMLVideoElement;
      video.load();
  }

}
