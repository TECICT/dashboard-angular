import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ListService } from '../services';

@Component({
  selector: 'add-list-type',
  templateUrl: './add-list-type.component.html',
  styleUrls: ['./list-settings.component.css'],
})
export class AddListTypeComponent implements OnInit{
  list: any = {};
  newLabel = {"key": "", "type": ""};
  listForm: FormGroup;
  error: string = "";
  sub: any;
  id: number;
  editting: boolean = false

  constructor(
    private listService: ListService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.listForm = fb.group({
      'listName': [null, Validators.required],
    })
  }

  ngOnInit() {
    this.list['labels'] = [];
    this.list['labels'].push({"key": "", "type": ""});
    this.sub = this.route.queryParams.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      if (this.id) {
        this.editting = true;
        this.listService.getType(this.id)
        .subscribe(data => {
          this.list = data;
        })
      }
      // In a real app: dispatch action to load the details here.
    });
  }

  addList() {
    this.validateList(() => {
      if (this.error == "") {
        if (this.editting) {
          this.listService.putType(this.list, this.id)
          .subscribe(data => {
            this.listForm.reset();
            this.router.navigateByUrl('/listsettings');
          })
        }
        this.listService.postType(this.list)
        .subscribe(data => {
          this.list = {};
          this.list['labels'] = [];
          this.list['labels'].push({"key": "", "type": ""});
          this.listForm.reset();
          this.router.navigateByUrl('/listsettings');
        })
      } else {
        console.log(this.error);
        this.error = "";
      }
    });
  }

  addLabel() {
    this.list['labels'].push({"key": "", "type": ""});
  }

  deleteLabel(index) {
    this.list['labels'].splice(index, 1);
  }

  validateList(cb) {
    if (this.list.listName == "" || !this.list.listName) {
      this.error = "The new list has to have a name. Please fill in all the inputs";
      cb();
    } else {
      this.list['labels'].forEach(item => {
        if (item.key == "" || item.type == "") {
          this.error = "please fill in all the fields or delete unnecessary items"
        }
      })
      cb();
    }
  }
}
