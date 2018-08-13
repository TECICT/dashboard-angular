import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ListService, UserService } from '../services';
import { User } from '../models';

@Component({
  selector: 'list-setting',
  templateUrl: './list-settings.component.html',
  styleUrls: ['./list-settings.component.css'],
})
export class ListSettingsComponent implements OnInit, AfterViewInit{
  allLists: any;
  newItems = {};
  error = "";
  user: User = new User();
  hasPermission: boolean = false;
  editing: boolean = false;

  constructor(
    private listService: ListService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getAll();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      (<any>Object).assign(this.user, this.userService.getCurrentUser());
      if (this.user.role == 'admin') {
        this.hasPermission = true;
      } else {
        this.hasPermission = false
      }
    }, 100);
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
        list.items.forEach(item => {
          item["editing"] = false;
        })
      })
    })
  }

  save(listName, id) {
    var i = this.allLists.findIndex((element, index) => {
      if (element.listName == listName){
        return true;
      }
    });
    if (!this.validateItem(listName)) {
      this.error = "please fill in all the fields";
    } else {
      this.allLists[i].items.push(this.newItems[listName])
      this.newItems[listName] = {};
      this.listService.putType(this.allLists[i], id)
      .subscribe(
        data => {
          this.getAll();
        }
      )
    }
  }

  saveExisting(listName, id) {
    var i = this.allLists.findIndex((element, index) => {
      if (element.listName == listName){
        return true;
      }
    });
    this.listService.putType(this.allLists[i], id)
    .subscribe(
      data => {
        this.getAll();
      }
    )
  }


  deleteList(id) {
    this.listService.deleteType(id)
    .subscribe(
      data => {
        console.log("list deleted");
        this.getAll();
      }
    )
  }

  deleteItem(item, listName, id) {
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
    this.listService.putType(this.allLists[i], id)
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
    this.listService.putType(list, list._id)
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
