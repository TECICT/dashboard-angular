import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ListService } from '../services';

@Component({
  selector: 'list-type',
  templateUrl: './list-type.component.html',
  styleUrls: ['./list-settings.component.css'],
})
export class ListTypeComponent implements OnInit{
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
          if (label.type == "boolean") {
            label.type ="checkbox";
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
      this.allLists[i].items.push(this.newItems[listName])
      this.listService.putType(this.allLists[i], listName)
      .subscribe(
        data => {
          console.log(data);
          this.getAll;
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
    console.log(item);
    console.log(listName);
  }

  validateItem(listName) {
    for (let item in this.newItems[listName]) {
      if (this.newItems[listName][item] == null || this.newItems[listName][item] === "") {
        return false;
      }
    }
    return true;
  }

}
