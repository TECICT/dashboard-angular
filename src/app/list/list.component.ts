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

          transition('faded => clear', animate('500ms 500ms ease-in')),
          transition('clear => faded', animate('500ms ease-out')),
      ]),
  ]
})
export class ListComponent implements OnInit{
  @Output() listLoaded = new EventEmitter();
  @Input() include: string[] = ['acute', 'bench', 'jobOffer', 'starter', 'stopper'];
  private animationTimer;
  public lists: any = [{'listName': ''}];
  public currentItem = 0;
  public itemKeys = [];
  public criticalIndex = -1;
  public criticalType = 'no';
  public state = 'faded';
  public noData = false;

  constructor(
    private listService: ListService
  ) {}

  ngOnInit() {
    this.getAll();
    // this.listTimer = Observable.timer(0, 5000);
    // this.listTimer.subscribe((t) => this.getAll());
    this.animationTimer = Observable.timer(5000, 5000);
    this.animationTimer.subscribe((t) => this.toggleState());
  }

  getAll() {
    this.listService.getAllTypes()
    .subscribe(
      data => {
        if (data.length == 0) {
          this.noData = true;
        } else {
          this.lists = data;
          console.log(this.lists);
          this.setList();
        }
        this.listLoaded.emit();
      }
    )
  }

  setList() {
    if (this.state == 'faded' && this.lists[0].labels) {
      this.currentItem = this.checkValidItem(this.currentItem);
      this.itemKeys = Object.keys(this.lists[this.currentItem].items[0]);
      this.getCriticalIndex();
      this.toggleState();
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
      return "#FFFFFF";
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
