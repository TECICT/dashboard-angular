import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

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

    state = "invisible";
    stateLoading = "visible";

    finishWeather() {
        console.log('1 done');
        this.weatherDone = true;
        this.checkAllDone();
    }

    finishSlideshow() {
        console.log('2 done');
        this.slideshowDone = true;
        this.checkAllDone();
    }

    finishLinkedin() {
        console.log('3 done');
        this.linkedinDone = true;
        this.checkAllDone();
    }

    finishMaps() {
        console.log('4 done');
        this.mapsDone = true;
        this.checkAllDone();
    }

    finishNews() {
        console.log('5 done');
        this.newsDone = true;
        this.checkAllDone();
    }

    checkAllDone() {
        
        if (this.weatherDone && this.slideshowDone && this.linkedinDone && this.mapsDone && this.newsDone) {
            console.log('all done');
            this.allDone = true;
            this.state = 'visible';
            this.stateLoading = 'invisible'
        }
    }
}
