import { Component, OnInit } from '@angular/core';
import { UserService } from './services';
import { Observable } from 'rxjs';
import { Http } from '@angular/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    public online: boolean = false;
    public src:string = "../assets/offline.png";
    private connectivityTimer;

    constructor (
        private userService: UserService,
        private http: Http
    ) {}

    ngOnInit() {
        this.userService.populate();
        this.connectivityTimer = Observable.timer(0, 5000)
        this.connectivityTimer.subscribe((t) => this.checkConnectivity());
        var imgData = this.getBase64Image(this.src); /*the banner image will be your image. place this in a loop or array if images are more than one and take imgData as array. ( i assume you know the trick ) */
        localStorage.setItem("imgData", imgData);
        var dataImage = localStorage.getItem('imgData');
        this.src = "data:image/png;base64," + dataImage;
    }

    checkConnectivity() {
        this.online = navigator.onLine;
    }

    getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
     
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
     
        var dataURL = canvas.toDataURL("image/png");
     
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }


}
