import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ListService } from '../services';

@Component({
  selector: 'list-settings',
  templateUrl: './list-settings.component.html',
  styleUrls: ['./list-settings.component.css'],
})
export class ListSettingsComponent implements OnInit{
  public include = ['acute', 'bench', 'jobOffer', 'starter', 'stopper'];
  public lists = {};
  public newAcute = {"payroll": false};
  acuteForm: FormGroup;
  titleAlert: string = 'This Field is required';

  constructor(
    private listService: ListService,
    private fb: FormBuilder
  ) {
    this.acuteForm = fb.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'function': [null, Validators.required],
      'availability': [null, Validators.required],
      'payroll': '',
      'accountManager': '',
    })
  }

  ngOnInit() {
    this.getAll();
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
  }

  delete(type, user) {
    this.listService.delete(type, user.id)
    .subscribe(
      data => {
        this.getAll();
      }
    )
  }

  makeUser(type) {
    var list = {};
    list[type] = this.newAcute;
    this.listService.post(type, list)
    .subscribe(
      data => {
        this.getAll();
        this.newAcute = {"payroll": false};
        this.acuteForm.reset();
      }
    )
    
  }
}
