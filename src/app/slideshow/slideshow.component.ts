import { Component, OnInit, ViewChild } from '@angular/core';

import { FileUploader } from 'ng2-file-upload';
import { Observable } from 'rxjs';

@Component({
  selector: 'slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit{
  src: String = "";
  // private slideshowTimer;

  ngOnInit() {
      this.src = 'http://localhost:3000/video';
      // this.slideshowTimer = Observable.timer(0, 60000);
      // this.slideshowTimer.subscribe((t) => this.loadVideo());
  }

  ngAfterViewInit() {
      this.loadVideo();
  }

  loadVideo() {
    console.log('reloading video');
      var videoHTML = document.getElementById('videoplayer');
      var video = <HTMLVideoElement> videoHTML;
      video = videoHTML as HTMLVideoElement;
      video.load();
  }

}
