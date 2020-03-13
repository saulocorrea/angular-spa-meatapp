import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../config';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];

  constructor(http: HttpClient) {
    var headers = new HttpHeaders({ "Content-Type": "application/json" })
    var httpOptions = { headers: headers };

    http.get<WeatherForecast[]>(Config.MeatApi.WeatherForecast, httpOptions)
      .subscribe(result => {
        this.forecasts = result;
      }, error => console.error(error));
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
