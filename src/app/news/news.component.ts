import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { parseString } from 'xml2js';
import { Observable } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css'],
    animations: [
        trigger('newNewsItem', [
            state('middle', style({
                transform: 'rotateX(90deg)'
            })),
            state('full' , style({
                transform: 'rotateX(0deg)',
            })),

            transition('middle => full', animate('500ms ease-in')),
            transition('full => middle', animate('500ms ease-out')),
        ]),
    ]
})
export class NewsComponent implements OnInit {
    data: any;
    titles: string[] = [];
    titleNow = '';
    descriptionNow = '';
    descriptions: string[] = [];
    private timer;
    private counter = 0;

    public state = 'full';

    constructor(private http:Http) {    
    }

    ngOnInit() {
        this.timer = Observable.timer(0, 14000);
        this.timer.subscribe((t) => this.onTimeOut());

        var headers = new Headers();
        headers.append('Accept', 'application/xml');
        this.http.get('https://www.vrt.be/vrtnws/nl.rss.headlines.xml', {headers: headers})
            .map(res => {
                var myRes
                parseString(res.text(), function (err, result) {
                    myRes = result;
                });
                return myRes;
            })
            .subscribe(res => {
                this.data = res;
                console.log(this.data);
                this.parseData(this.data);
            });

    }

    parseData(data) {
        var i;
        for (i = 0; i < 5; i++) {
            this.titles[i] = data.feed.entry[i].title[0]._;
            this.descriptions[i] = data.feed.entry[i].summary[0]._;
        }
        this.titleNow = this.titles[0];
        this.descriptionNow = this.descriptions[0];
    }

    onTimeOut() {
        this.toggleState();
    }

    toggleState() {
        this.state = this.state === 'middle' ? 'full' : 'middle';
    }

    setNewItem() {
        if (this.state == 'middle') {
            if (this.counter >= 5) {
                this.counter = 0;
            }
            this.titleNow = this.titles[this.counter];
            this.descriptionNow = this.descriptions[this.counter];
            this.counter++;
            this.toggleState();
        }

    }
}
