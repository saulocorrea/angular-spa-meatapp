import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { AuthService } from "../_services/auth.service";
import { Injectable } from "@angular/core";
import { Config } from "../config";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //spinner
    
    if (request.url.indexOf(`${Config.MeatApi.GetToken}`) >= 0) {
      return next.handle(request);
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.token}`
      }
    });

    return next.handle(request);
      //.pipe(
      //  tap(
      //    () => { },
      //    error => {
      //      if (error instanceof HttpErrorResponse) {

      //        // const regex = /^(http(s?):\/\/)?(www\.)?([a-z0-9]+([\-\.*]{1}[a-z0-9]+)*(\.)*[a-z]{2,5}(:[0-9]{1,5})?(\/api\/login$)$)/i;
      //        // const isLoginRequest = regex.test(error.url);

      //        // if (!isLoginRequest && error.status === 401) {
      //        //   this.router.navigate(['login']);
      //        // }
      //      }
      //    })
      //);
  }
}
