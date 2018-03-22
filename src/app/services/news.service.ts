import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

import { ApiService } from './api.service';

@Injectable()
export class NewsService {
  
  constructor(private apiService: ApiService ) {}

  get(): Observable<any> {
    return this.apiService.get('/news')
           .map(data => data);
  }
}