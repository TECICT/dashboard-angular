import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';

@Injectable()
export class ListService {
  constructor (
    private apiService: ApiService
  ) {}

  get(list): Observable<any[]> {
    return this.apiService.get('/lists/' + list)
           .map(data => data);
  }

  post(list, object) {
    return this.apiService.post('/lists/' + list, object);
  }

  save(list, params): Observable<any[]> {
    return this.apiService.put('/lists/' + list + '/' + params._id, {list: params})
             .map(data => data);
  }

  delete(list, id) {
    return this.apiService.delete('/lists/' + list + '/' + id)
  }

  getAllTypes(): Observable<any[]> {
    return this.apiService.get('/listtype/')
           .map(data => data);
  }

  getType(listName): Observable<any[]> {
    return this.apiService.get('/listtype/' + listName)
           .map(data => data);
  }

  postType(object) {
    return this.apiService.post('/listtype/', object);
  }

  putType(object, listName) {
    return this.apiService.put('/listtype/' + listName, object);
  }

  deleteType(listName) {
    return this.apiService.delete('/listtype/' + listName)
  }
}
