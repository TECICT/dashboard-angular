import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { ListService } from '../services';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'list-highlighter',
  templateUrl: './list-highlighter.component.html',
  styleUrls: ['./list-highlighter.component.css'],
  animations: [
      trigger('newItem', [
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

export class ListHighlighterComponent implements OnInit{
  @Output() listHighlighterLoaded = new EventEmitter();
  @Input() listName: string;
  @Input() stylePreset: string; //fill in dark to get a dark styling
  public noData = true;
  public lists: any = [{'listName': ''}];
  public list = {items: []};
  public errorMsg = "";
  public state = 'faded';
  public currentItem = 0;
  private animationTimer;
  private dataTimer;
  private subscription;


  constructor(
    private listService: ListService
  ) {
    this.animationTimer = Observable.timer(5000, 5000);
    this.subscription = this.animationTimer.subscribe((t) => this.toggleState());
  }

  ngOnInit() {
    this.dataTimer = Observable.timer(0, 30000);
    this.dataTimer.subscribe((t) => this.getList());
  }

  getList() {
    this.listService.getAllTypes()
    .subscribe(
      data => {
        if (data.length == 0) {
          this.noData = true;
        } else {
          this.lists = data;
          if (!this.listName) {
            this.errorMsg = "There is no list specified..."
          }
          else {
            this.checkLists();
            if (this.list.items.length == 1) {
              this.subscription.unsubscribe();
            }
            this.setList();
          }
          this.noData = false;
        }
        this.listHighlighterLoaded.emit();
      }
    )
  }

  checkLists() {
    for (let index in this.lists) {
      if (this.lists[index].listName.toLowerCase() == this.listName.toLowerCase()) {
        this.list = this.lists[index];
      }
    }
    if (this.list.items.length == 0) {
      this.errorMsg = "The list " + this.listName + " could not be found... Please make sure the list exists.";
    }
  }

  setList() {
    if (this.state == 'faded' && this.list.items) {
      this.currentItem = this.checkValidItem(this.currentItem);
      this.toggleState();
    }
  }

  checkValidItem(current) {
    current += 1;
    if (current >= this.list.items.length) {
      current = 0;
    }
    return current;
  }

  toggleState() {
    this.state = this.state === 'faded' ? 'clear' : 'faded';
  }
}
