import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Token } from "../auth/token";
import { Config } from "../config";

@Injectable({ providedIn: 'root' })
export class AuthService {

  token: any;

  constructor(private http: HttpClient) {
  }

  loadToken(): void {
    //debugger;
    this.http.get<any>(Config.MeatApi.GetToken)
      .subscribe(result => {
        //debugger;
        var token = result;
        if (token && token.token) {
          this.token = token.token;
        }
      }, error => console.error(error));

  }
}
