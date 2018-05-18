import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { parseString } from 'xml2js';
import { Observable } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { NewsService } from '../services';

@Component({
    selector: 'news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css'],
    animations: [
        trigger('newNewsItem', [
            state('middle', style({
                opacity: 0
            })),
            state('full' , style({
                opacity: 1
            })),

            transition('middle => full', animate('500ms 500ms ease-in')),
            transition('full => middle', animate('500ms ease-out')),
        ]),
    ]
})
export class NewsComponent implements OnInit {
    @Output() newsLoaded = new EventEmitter<boolean>();
    data: any;
    titles: string[] = [];
    titleNow: string = '';
    descriptionNow = '';
    descriptions: string[] = [];
    private animationTimer;
    private newsTimer;
    private counter = 0;

    public state = 'full';

    constructor(private newsService: NewsService) {
    }

    ngOnInit() {
        this.animationTimer = Observable.timer(0, 14000);
        this.animationTimer.subscribe((t) => this.toggleState());

        this.newsTimer = Observable.timer(0, 3600000);
        this.newsTimer.subscribe((t) => this.getNews());
    }

    getNews() {

        this.newsService.get()
        .subscribe(
            data => {
                this.data = data;
                if (this.data.error) {
                    if (this.titleNow == '') this.errorMessage();
                    this.newsLoaded.emit(true);
                    this.getNews();
                } else {
                    this.parseData(this.data);
                }
            },
            error => {
                if (!this.titleNow) {
                    this.errorMessage();
                }
                this.newsLoaded.emit(true);
                this.getNews();
            }
        );
    }

    parseData(data) {
        var i;
        for (i = 0; i < 10; i++) {
            this.titles[i] = data.feed.entry[i].title[0]._;
            this.descriptions[i] = data.feed.entry[i].summary[0]._;
        }
        this.titleNow = this.titles[0];
        this.descriptionNow = this.descriptions[0];
        this.newsLoaded.emit(true);
    }

    errorMessage() {
        this.titles = ['News server is not available'];
        this.descriptions = ['No news'];
        this.titleNow = this.titles[0];
        this.descriptionNow = this.descriptions[0];
    }

    toggleState() {
        this.state = this.state === 'middle' ? 'full' : 'middle';
    }

    setNewItem() {
        if (this.state == 'middle') {
            if (this.counter >= this.titles.length) {
                this.counter = 0;
            }
            this.titleNow = this.titles[this.counter];
            this.descriptionNow = this.descriptions[this.counter];
            this.counter++;
            this.toggleState();
        }

    }
}
