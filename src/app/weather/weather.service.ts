import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class WeatherService {
  
  private appId = '82a201e18dca26b6f031f84cc4c43eb2';
  private baseUrl ='http://api.openweathermap.org/data/2.5/';
  private units = 'metric';
  private city = 'brussel';

  //constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: Http) { }
  
  constructor(private http: HttpClient ) { 
     console.log('Production='+ environment.production);

  }

  getWeatheritemsbyCity(cityName): Observable<any>{

         return this.http.get(
           this.baseUrl +
           'weather?q='+ cityName +
           '&appid='+ this.appId +
           '&units=' + this.units,
         )
         .map(response => response)
         .catch(this.handleError);
  }

  getWeatherForecast(cityName): Observable<any[]>{

     return this.http.get(
       this.baseUrl + 'forecast?q=' + cityName + '&appid=' + this.appId + '&units=' + this.units,
       { headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*'),})
     .map(response => this.extractData(response))
     .catch(this.handleError);
  }

  private extractData(res: any) {
    let body = res.json();
    return body.list || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    // if (error instanceof Response) {
    //   const body = error.json() || '';
    //   const err = body.error || JSON.stringify(body);
    //   errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    // } else {
      errMsg = error.message ? error.message : error.toString();
    //}
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}