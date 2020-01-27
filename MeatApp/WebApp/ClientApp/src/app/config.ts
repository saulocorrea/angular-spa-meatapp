import { environment } from "../environments/environment"

export class Config {

  private static urlApiMeatApp = environment.urlApiMeatApp;

  static MeatApi = {
    GetToken: `${Config.urlApiMeatApp}api/weatherforecast/get-token`,
    WeatherForecast: `${Config.urlApiMeatApp}api/weatherforecast`
  };

}
