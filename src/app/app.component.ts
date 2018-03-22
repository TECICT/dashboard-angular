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
    public online: boolean = true;
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
    }

    checkConnectivity() {
        this.online = navigator.onLine;
    }
}
