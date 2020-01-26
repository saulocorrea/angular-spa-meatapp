import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    http.get<WeatherForecast[]>(Config.MeatApi.WeatherForecast)
      .subscribe(result => {
        this.forecasts = result;
      }, error => console.error(error));

    //var httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };
    //http.post<WeatherForecast[]>(Config.MeatApi.WeatherForecast, httpOptions)
    //    .subscribe(result => {
    //      this.forecasts = result;
    //    }, error => console.error(error));
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
