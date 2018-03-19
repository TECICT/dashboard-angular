import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable } from 'rxjs';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
        trigger('allDone', [
            state('invisible', style({
                opacity: 0
            })),
            state('visible' , style({
                opacity: 1
            })),

            transition('invisible => visible', animate('500ms 500ms ease-in')),
            transition('visible => invisible', animate('500ms ease-out')),
        ]),
    ]
})
export class DashboardComponent {
    weatherState = "invisible";
    slideshowState = "invisible";
    linkedinState = "invisible";
    mapsState = "invisible";
    newsState = "invisible";
    allDone: boolean = false;
    errors = [];
    finishedTimer;
    refreshTimer;
    refresh: boolean = true;

    state = "invisible";
    stateLoading = "visible";

    ngOnInit() {
        this.finishedTimer = Observable.timer(10000, 10000)
        this.finishedTimer.subscribe((t) => this.checkErrors());
        // this.refreshTimer = Observable.timer(60000, 60000)
        // this.refreshTimer.subscribe((t) => this.checkRefresh());
    }

    finishWeather(evt) {
        if (evt) this.weatherState = "visible";
        else this.weatherState = "invisible";
        this.checkAllDone();
    }

    finishSlideshow(evt) {
        if (evt) this.slideshowState = "visible";
        else this.slideshowState = "invisible";
        this.checkAllDone();
    }

    finishLinkedin(evt) {
        if (evt) this.linkedinState = "visible";
        else this.linkedinState = "invisible";
        this.checkAllDone();
    }

    finishMaps(evt) {
        if (evt) this.mapsState = "visible";
        else this.mapsState = "invisible";
        this.checkAllDone();
    }

    finishNews(evt) {
        if (evt) this.newsState = "visible";
        else this.newsState = "invisible";
        this.checkAllDone();
    }

    checkAllDone() {
        this.stateLoading = "invisible";
    }

    checkErrors() {
    }

    // removeError(type) {
    //     if (this.errors.indexOf(type) !== -1) {
    //         this.errors.splice(this.errors.indexOf(type), 1);
    //     }
    // }

    // checkRefresh() {
    //     if (!this.allDone) {
    //         window.location.reload();
    //     }
    // }
}
