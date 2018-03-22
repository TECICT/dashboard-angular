import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Settings } from '../models'

@Injectable()
export class SettingsService {
  constructor (
    private apiService: ApiService
  ) {}

  get(): Observable<Settings> {
    return this.apiService.get('/settings')
           .map(data => data);
  }

  destroy() {
    return this.apiService.delete('/setings/');
  }

  save(settings): Observable<Settings> {
    return this.apiService.put('/settings/', {settings: settings})
             .map(data => data);
  }
}
