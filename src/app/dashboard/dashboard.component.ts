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
    weatherDone: boolean = false;
    slideshowDone: boolean = false;
    linkedinDone: boolean = false;
    mapsDone: boolean = false;
    newsDone: boolean = false;
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

    finishWeather() {
        this.weatherDone = true;
        this.removeError('weather');
        this.checkAllDone();
    }

    finishSlideshow() {
        this.slideshowDone = true;
        this.removeError('slideshow');
        this.checkAllDone();
    }

    finishLinkedin() {
        this.linkedinDone = true;
        this.removeError('linkedin');
        this.checkAllDone();
    }

    finishMaps() {
        this.mapsDone = true;
        this.removeError('maps');
        this.checkAllDone();
    }

    finishNews() {
        this.newsDone = true;
        this.removeError('news');
        this.checkAllDone();
    }

    checkAllDone() {
        if (this.weatherDone && this.slideshowDone && this.mapsDone && this.newsDone) {
            this.allDone = true;
            this.state = 'visible';
            this.stateLoading = 'invisible'
        }
    }

    checkErrors() {
        if (!this.allDone) {
            if (!this.weatherDone && this.errors.indexOf('weather') == -1) {
                this.errors.push('weather');
            }
            if (!this.slideshowDone && this.errors.indexOf('slideshow') == -1) {
                this.errors.push('slideshow');
            }
            if (!this.linkedinDone && this.errors.indexOf('linkedin') == -1) {
                this.errors.push('linkedin');
            }
            if (!this.mapsDone && this.errors.indexOf('maps') == -1) {
                this.errors.push('maps');
            }
            if (!this.newsDone && this.errors.indexOf('news') == -1) {
                this.errors.push('news');
            }
            console.log(this.errors);
        }
    }

    removeError(type) {
        if (this.errors.indexOf(type) !== -1) {
            this.errors.splice(this.errors.indexOf(type), 1);
        }
    }

    // checkRefresh() {
    //     if (!this.allDone) {
    //         window.location.reload();
    //     }
    // }
}
