import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ListService } from '../services';

@Component({
  selector: 'list-setting',
  templateUrl: './list-settings.component.html',
  styleUrls: ['./list-settings.component.css'],
})
export class ListSettingsComponent implements OnInit{
  allLists: any;
  newItems = {};
  error = "";
  constructor(
    private listService: ListService,
  ) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.listService.getAllTypes()
    .subscribe(data => {
      this.allLists = data;
      this.allLists.forEach((list) => {
        this.newItems[list.listName] = {};
        list.labels.forEach(label => {
          this.newItems[list.listName][label.key] = null;
          if (label.type == "checkbox") {
            this.newItems[list.listName][label.key] = false;
          }
        })
      })
    })
  }

  save(listName) {
    var i = this.allLists.findIndex((element, index) => {
      if (element.listName == listName){
        return true;
      }
    });
    if (!this.validateItem(listName)) {
      this.error = "please fill in all the fields";
    } else {
      console.log(this.newItems[listName]);
      this.allLists[i].items.push(this.newItems[listName])
      this.newItems[listName] = {};
      this.listService.putType(this.allLists[i], listName)
      .subscribe(
        data => {
          this.getAll();
        }
      )
    }
  }

  delete(listName) {
    this.listService.deleteType(listName)
    .subscribe(
      data => {
        this.getAll();
      }
    )
  }

  deleteItem(item, listName) {
    var i = this.allLists.findIndex((element, index) => {
      if (element.listName == listName){
        return true;
      }
    });
    var j = this.allLists[i].items.findIndex((element, index) => {
      if (element === item) {
        return true;
      }
    });
    this.allLists[i].items.splice(j, 1);
    this.listService.putType(this.allLists[i], listName)
    .subscribe(
      data => {
        this.getAll();
      }
    )
  }

  validateItem(listName) {
    for (let item in this.newItems[listName]) {
      if (this.newItems[listName][item] == null || this.newItems[listName][item] === "") {
        return false;
      }
    }
    return true;
  }

  setCritical(list, label) {
    list.labels.forEach((listLabel, index) => {
      if (listLabel.key == label.key) {
        if (listLabel.critical == 'yes') {
          listLabel.critical = 'reverse';
        } else if (listLabel.critical == 'reverse'){
          listLabel.critical = 'no';
        } else {
          listLabel.critical = 'yes';
        }
      } else {
        listLabel.critical = 'no';
      }
    });
    this.listService.putType(list, list.listName)
    .subscribe(
      data => {
        this.getAll();
      }
    )
  }

  getBackgroundColor(label) {
    if (label.critical == 'yes') {
      return "#63D668";
    } else if (label.critical == 'reverse') {
      return "#F23C32";
    } else {
      return "#FFFFFF";
    }
  }
}
