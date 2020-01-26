import { environment } from "../environments/environment"

export class Config {

  private static urlApiMeatApp = environment.urlApiMeatApp;

  static MeatApi = {
    WeatherForecast: `${Config.urlApiMeatApp}api/weatherforecast`
  };

}
