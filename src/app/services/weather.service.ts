import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

import { ApiService } from './api.service';

@Injectable()
export class WeatherService {
  private city = 'brussel';

  //constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: Http) { }
  
  constructor(private apiService: ApiService ) {}

  get(city): Observable<any> {
    return this.apiService.get('/weather/' + city)
           .map(data => data);
  }
}