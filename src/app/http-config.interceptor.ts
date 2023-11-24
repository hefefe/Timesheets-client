import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalconstantsModule } from './common/globalconstants.module';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let req: HttpRequest<unknown> | null = null;
    const accessToken = localStorage.getItem(GlobalconstantsModule.atoken);
    const refreshToken = localStorage.getItem(GlobalconstantsModule.rtoken);

    if (accessToken){
      req = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      });
    }

    return next.handle(req || request);
  }
}
