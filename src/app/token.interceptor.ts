import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {GlobalService} from "./service/global.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private globalService: GlobalService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: true
    })
    return next.handle(request).pipe(
      catchError(
        err => {
          if (err.status == 0 || (500 <= err.status && err.status <= 511)) {
            this.globalService.msg(err.message)
          }
          if (err.status == 401) {
            this.router.navigate(["no-access"]).then()
          }
          return throwError(() => err)
        }
      )
    )
  }
}
