import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

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
  @Output() slideshowLoaded = new EventEmitter<boolean>();
  src: String = "";
  private slideshowTimer;
  serverOnline: boolean = true;

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
      // this.src = environment.api_url + '/video';
      
      this.slideshowTimer = Observable.timer(0, 10000);
      this.slideshowTimer.subscribe((t) => this.changeSource());
  }

  changeSource() {
      this.settingsService.get()
      .subscribe(
        settings => {
          if (!this.serverOnline || this.src !== environment.api_url + '/video/' + settings.video.split('/').pop()) {
            this.serverOnline = true;
            this.src = environment.api_url + '/video/' + settings.video.split('/').pop();
            this.loadVideo();
          }
        },
        error => {
          this.serverOnline = false;
          this.slideshowLoaded.emit(true);
          this.changeSource();
        }
      );
  }

  loadVideo() {
    console.log('reloading video');
      var videoHTML = document.getElementById('videoplayer');
      var video = <HTMLVideoElement> videoHTML;
      video = videoHTML as HTMLVideoElement;
      video.load();
      this.slideshowLoaded.emit(true);
  }

}
