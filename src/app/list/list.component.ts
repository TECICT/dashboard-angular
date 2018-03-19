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
  @Input() include: string[] = ['acute', 'bench', 'jobOffer', 'starter', 'stopper'];
  @Output() listLoaded = new EventEmitter();
  public possibilities = ['acute', 'bench', 'joboffer', 'starter', 'stopper'];
  private listTimer;
  private animationTimer;
  public lists = {};
  public currentItem = 0;
  public state = 'clear';

  constructor(
    private listService: ListService
  ) {}

  ngOnInit() {
    this.checkInput(function(self) {
      self.listTimer = Observable.timer(0, 5000);
      self.listTimer.subscribe((t) => self.getAll());
      if (self.include.length > 1) {
        self.animationTimer = Observable.timer(0, 10000);
        self.animationTimer.subscribe((t) => self.toggleState());
      } else {
        self.toggleState();
      }
    });
  }

  checkInput(cb) {
    this.include.forEach(value => {
      if (this.possibilities.indexOf(value.toLowerCase()) == -1) {
        this.include.splice(this.include.indexOf(value, 1));
      }
    });
    cb(this);
    
  }

  getAll() {
    this.include.forEach(value => {
      this.listService.get(value)
      .subscribe(
        data => {
          this.lists[value] = data;
        }
      )
    });
    this.listLoaded.emit();
  }

  getBackgroundcolor(criticalParameter) {
    if (criticalParameter) {
      return "#ff7272";
    } else {
      return "#c4ffcc";
    }
  }

  changeList() {
    if (this.state == 'faded') {
      if (this.currentItem >= this.include.length - 1) {
        this.currentItem = 0;
      } else {
        this.currentItem += 1;
      }
      this.toggleState();
    }
  }

  toggleState() {
    this.state = this.state === 'faded' ? 'clear' : 'faded';
  }
}
