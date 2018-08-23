import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { ListService } from '../services';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [
      trigger('newList', [
          state('faded', style({
              opacity: 0
          })),
          state('clear' , style({
              opacity: 1
          })),

          transition('faded => clear', animate('250ms 250ms ease-in')),
          transition('clear => faded', animate('250ms ease-out')),
      ]),
  ]
})
export class ListComponent implements OnInit{
  @Output() listLoaded = new EventEmitter();
  @Input() include: string[] = [];
  @Input() exclude: string[] = [];
  private animationTimer;
  private dataTimer;
  public lists: any = [{'listName': ''}];
  public currentItem = 0;
  public itemKeys = [];
  public criticalIndex = -1;
  public criticalType = 'no';
  public state = 'faded';
  public noData = true;
  private subscription;

  constructor(
    private listService: ListService
  ) {}

  ngOnInit() {
    this.getAll();
    this.dataTimer = Observable.timer(0, 30000);
    this.dataTimer.subscribe((t) => this.getAll());
    this.animationTimer = Observable.timer(15000, 15000);
    this.subscription = this.animationTimer.subscribe((t) => this.toggleState());
  }

  getAll() {
    this.listService.getAllTypes()
    .subscribe(
      data => {
        if (data.length == 0) {
          this.noData = true;
        } else {
          this.lists = data;
          if (this.include.length > 0 || this.exclude.length > 0) {
            this.clearLists();
          }
          this.splitLists();
          this.setList();
          this.noData = false;
        }
        this.listLoaded.emit();
      }
    )
  }

  clearLists() {
    for (let index = this.lists.length - 1; index >= 0; index--) {
      if (this.include.length > 0 && !this.include.includes(this.lists[index].listName)) {
        this.lists.splice(index, 1);
      }
      if (this.exclude.includes(this.lists[index].listName)) {
        this.lists.splice(index, 1);
      }
    }
  }

  splitLists() {
    let listSplitted = false;
    for (let index in this.lists) {
      if (this.lists[index].items.length > 12) {
        let listCopy = JSON.parse(JSON.stringify(this.lists[index]));
        listCopy.items.splice(0,12);
        this.lists[index].items.splice(12);
        this.lists.splice(index+1, 0, listCopy);
        listSplitted = true;
      }
    }
    if (listSplitted) {
      this.splitLists();
    }
  }

  checkAnyValid() {
    let anyValid = false;
    for(let listItem of this.lists) {
      if (listItem.items.length != 0) {
        anyValid = true;
      }
    }
    return anyValid;
  }

  setList() {
    if (this.state == 'faded' && this.lists[0].labels) {
      if (this.checkAnyValid()) {
        this.currentItem = this.checkValidItem(this.currentItem);
        this.itemKeys = Object.keys(this.lists[this.currentItem].items[0]);
        this.getCriticalIndex();
        this.toggleState();
      }
    }
  }

  checkValidItem(current) {
    current += 1;
    if (current >= this.lists.length) {
      current = 0;
    }
    if (this.lists[current].items.length == 0) {
      current = this.checkValidItem(current);
      return current;
    } else {
      return current;
    }
  }

  getCriticalIndex() {
    this.criticalIndex = -1;
    this.criticalType = 'no';
    this.lists[this.currentItem].labels.forEach(
      (label, index) => {
        if (label.critical == 'yes') {
          this.criticalIndex = index;
          this.criticalType = 'yes';
        } else if (label.critical == 'reverse') {
          this.criticalIndex = index;
          this.criticalType = 'reverse';
        }
      }
    )
  }

  getBackgroundcolor(item) {
    if (this.criticalIndex == -1) {
      return "#DDDDDD";
    } else {
      if (this.lists[this.currentItem].labels[this.criticalIndex].critical == 'yes') {
        if (item[this.itemKeys[this.criticalIndex]]) {
          return "#63D668";
        } else {
          return "#F23C32";
        }
      } else if (this.lists[this.currentItem].labels[this.criticalIndex].critical == 'reverse') {
        if (item[this.itemKeys[this.criticalIndex]] == false) {
          return "#63D668";
        } else {
          return "#F23C32";
        }
      }
    }
  }

  toggleState() {
    this.state = this.state === 'faded' ? 'clear' : 'faded';
  }
}
