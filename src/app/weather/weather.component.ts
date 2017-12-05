import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weather = {'name': '', 'main': {'temp': 0}};
  icon = '';
  private weatherTimer;

  constructor(private weatherService: WeatherService) {

  }

  ngOnInit() {
    this.weather['name'] = '';

    this.weatherTimer = Observable.timer(0, 3600000);
    this.weatherTimer.subscribe((t) => this.getWeather());
  }

  getWeather() {
    this.weatherService.getWeatheritemsbyCity('Brussels')
    .subscribe(
      data => {
        this.weather = data;
        this.icon = this.translateIcon(data.weather[0].id);
        console.log(this.weather);
      },
      error => {
        console.log('error getting the weather');
      }
    );
  }

  translateIcon(code) {
    var iconText = '';
    switch(code) {
      case 200: iconText = "thunderstorm"; break;
      case 201: iconText = 'thunderstorm'; break;
      case 202: iconText = 'thunderstorm'; break;
      case 210: iconText = 'lightning'; break;
      case 211: iconText = 'lightning'; break;
      case 212: iconText = 'lightning'; break;
      case 221: iconText = 'lightning'; break;
      case 230: iconText = 'thunderstorm'; break;
      case 231: iconText = 'thunderstorm'; break;
      case 232: iconText = 'thunderstorm'; break;
      case 300: iconText = 'sprinkle'; break;
      case 301: iconText = 'sprinkle'; break;
      case 302: iconText = 'rain'; break;
      case 310: iconText = 'rain-mix'; break;
      case 311: iconText = 'rain'; break;
      case 312: iconText = 'rain'; break;
      case 313: iconText = 'showers'; break;
      case 314: iconText = 'rain'; break;
      case 321: iconText = 'sprinkle'; break;
      case 500: iconText = 'sprinkle'; break;
      case 501: iconText = 'rain'; break;
      case 502: iconText = 'rain'; break;
      case 503: iconText = 'rain'; break;
      case 504: iconText = 'rain'; break;
      case 511: iconText = 'rain-mix'; break;
      case 520: iconText = 'showers'; break;
      case 521: iconText = 'showers'; break;
      case 522: iconText = 'showers'; break;
      case 531: iconText = 'storm-showers'; break;
      case 600: iconText = 'snow'; break;
      case 601: iconText = 'snow'; break;
      case 602: iconText = 'sleet'; break;
      case 611: iconText = 'rain-mix'; break;
      case 612: iconText = 'rain-mix'; break;
      case 615: iconText = 'rain-mix'; break;
      case 616: iconText = 'rain-mix'; break;
      case 620: iconText = 'rain-mix'; break;
      case 621: iconText = 'snow'; break;
      case 622: iconText = 'snow'; break;
      case 701: iconText = 'showers'; break;
      case 711: iconText = 'smoke'; break;
      case 721: iconText = 'day-haze'; break;
      case 731: iconText = 'dust'; break;
      case 741: iconText = 'fog'; break;
      case 761: iconText = 'dust'; break;
      case 762: iconText = 'dust'; break;
      case 771: iconText = 'cloudy-gusts'; break;
      case 781: iconText = 'tornado'; break;
      case 800: iconText = 'day-sunny'; break;
      case 801: iconText = 'cloudy-gusts'; break;
      case 802: iconText = 'cloudy-gusts'; break;
      case 803: iconText = 'cloudy-gusts'; break;
      case 804: iconText = 'cloudy'; break;
      case 900: iconText = 'tornado'; break;
      case 901: iconText = 'storm-showers'; break;
      case 902: iconText = 'hurricane'; break;
      case 903: iconText = 'snowflake-cold'; break;
      case 904: iconText = 'hot'; break;
      case 905: iconText = 'windy'; break;
      case 906: iconText = 'hail'; break;
      case 957: iconText = 'strong-wind'; break;
      case 200: iconText = 'day-thunderstorm'; break;
      case 201: iconText = 'day-thunderstorm'; break;
      case 202: iconText = 'day-thunderstorm'; break;
      case 210: iconText = 'day-lightning'; break;
      case 211: iconText = 'day-lightning'; break;
      case 212: iconText = 'day-lightning'; break;
      case 221: iconText = 'day-lightning'; break;
      case 230: iconText = 'day-thunderstorm'; break;
      case 231: iconText = 'day-thunderstorm'; break;
      case 232: iconText = 'day-thunderstorm'; break;
      case 300: iconText = 'day-sprinkle'; break;
      case 301: iconText = 'day-sprinkle'; break;
      case 302: iconText = 'day-rain'; break;
      case 310: iconText = 'day-rain'; break;
      case 311: iconText = 'day-rain'; break;
      case 312: iconText = 'day-rain'; break;
      case 313: iconText = 'day-rain'; break;
      case 314: iconText = 'day-rain'; break;
      case 321: iconText = 'day-sprinkle'; break;
      case 500: iconText = 'day-sprinkle'; break;
      case 501: iconText = 'day-rain'; break;
      case 502: iconText = 'day-rain'; break;
      case 503: iconText = 'day-rain'; break;
      case 504: iconText = 'day-rain'; break;
      case 511: iconText = 'day-rain-mix'; break;
      case 520: iconText = 'day-showers'; break;
      case 521: iconText = 'day-showers'; break;
      case 522: iconText = 'day-showers'; break;
      case 531: iconText = 'day-storm-showers'; break;
      case 600: iconText = 'day-snow'; break;
      case 601: iconText = 'day-sleet'; break;
      case 602: iconText = 'day-snow'; break;
      case 611: iconText = 'day-rain-mix'; break;
      case 612: iconText = 'day-rain-mix'; break;
      case 615: iconText = 'day-rain-mix'; break;
      case 616: iconText = 'day-rain-mix'; break;
      case 620: iconText = 'day-rain-mix'; break;
      case 621: iconText = 'day-snow'; break;
      case 622: iconText = 'day-snow'; break;
      case 701: iconText = 'day-showers'; break;
      case 711: iconText = 'smoke'; break;
      case 721: iconText = 'day-haze'; break;
      case 731: iconText = 'dust'; break;
      case 741: iconText = 'day-fog'; break;
      case 761: iconText = 'dust'; break;
      case 762: iconText = 'dust'; break;
      case 781: iconText = 'tornado'; break;
      case 800: iconText = 'day-sunny'; break;
      case 801: iconText = 'day-cloudy-gusts'; break;
      case 802: iconText = 'day-cloudy-gusts'; break;
      case 803: iconText = 'day-cloudy-gusts'; break;
      case 804: iconText = 'day-sunny-overcast'; break;
      case 900: iconText = 'tornado'; break;
      case 902: iconText = 'hurricane'; break;
      case 903: iconText = 'snowflake-cold'; break;
      case 904: iconText = 'hot'; break;
      case 906: iconText = 'day-hail'; break;
      case 957: iconText = 'strong-wind'; break;
      case 200: iconText = 'night-alt-thunderstorm'; break;
      case 201: iconText = 'night-alt-thunderstorm'; break;
      case 202: iconText = 'night-alt-thunderstorm'; break;
      case 210: iconText = 'night-alt-lightning'; break;
      case 211: iconText = 'night-alt-lightning'; break;
      case 212: iconText = 'night-alt-lightning'; break;
      case 221: iconText = 'night-alt-lightning'; break;
      case 230: iconText = 'night-alt-thunderstorm'; break;
      case 231: iconText = 'night-alt-thunderstorm'; break;
      case 232: iconText = 'night-alt-thunderstorm'; break;
      case 300: iconText = 'night-alt-sprinkle'; break;
      case 301: iconText = 'night-alt-sprinkle'; break;
      case 302: iconText = 'night-alt-rain'; break;
      case 310: iconText = 'night-alt-rain'; break;
      case 311: iconText = 'night-alt-rain'; break;
      case 312: iconText = 'night-alt-rain'; break;
      case 313: iconText = 'night-alt-rain'; break;
      case 314: iconText = 'night-alt-rain'; break;
      case 321: iconText = 'night-alt-sprinkle'; break;
      case 500: iconText = 'night-alt-sprinkle'; break;
      case 501: iconText = 'night-alt-rain'; break;
      case 502: iconText = 'night-alt-rain'; break;
      case 503: iconText = 'night-alt-rain'; break;
      case 504: iconText = 'night-alt-rain'; break;
      case 511: iconText = 'night-alt-rain-mix'; break;
      case 520: iconText = 'night-alt-showers'; break;
      case 521: iconText = 'night-alt-showers'; break;
      case 522: iconText = 'night-alt-showers'; break;
      case 531: iconText = 'night-alt-storm-showers'; break;
      case 600: iconText = 'night-alt-snow'; break;
      case 601: iconText = 'night-alt-sleet'; break;
      case 602: iconText = 'night-alt-snow'; break;
      case 611: iconText = 'night-alt-rain-mix'; break;
      case 612: iconText = 'night-alt-rain-mix'; break;
      case 615: iconText = 'night-alt-rain-mix'; break;
      case 616: iconText = 'night-alt-rain-mix'; break;
      case 620: iconText = 'night-alt-rain-mix'; break;
      case 621: iconText = 'night-alt-snow'; break;
      case 622: iconText = 'night-alt-snow'; break;
      case 701: iconText = 'night-alt-showers'; break;
      case 711: iconText = 'smoke'; break;
      case 721: iconText = 'day-haze'; break;
      case 731: iconText = 'dust'; break;
      case 741: iconText = 'night-fog'; break;
      case 761: iconText = 'dust'; break;
      case 762: iconText = 'dust'; break;
      case 781: iconText = 'tornado'; break;
      case 800: iconText = 'night-clear'; break;
      case 801: iconText = 'night-alt-cloudy-gusts'; break;
      case 802: iconText = 'night-alt-cloudy-gusts'; break;
      case 803: iconText = 'night-alt-cloudy-gusts'; break;
      case 804: iconText = 'night-alt-cloudy'; break;
      case 900: iconText = 'tornado'; break;
      case 902: iconText = 'hurricane'; break;
      case 903: iconText = 'snowflake-cold'; break;
      case 904: iconText = 'hot'; break;
      case 906: iconText = 'night-alt-hail'; break;
      case 957: iconText = 'strong-wind'; break;
    }
    return iconText;
  }
}
