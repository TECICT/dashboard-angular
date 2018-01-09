import { Component, OnInit } from '@angular/core';
import { UserService } from './services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    public online: boolean = false;
    private connectivityTimer;
    constructor (
        private userService: UserService
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
