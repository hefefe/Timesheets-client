import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { GlobalconstantsModule } from './common/globalconstants.module';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let req: HttpRequest<unknown> | null = null;
    const accessToken = localStorage.getItem(GlobalconstantsModule.atoken) || sessionStorage.getItem(GlobalconstantsModule.atoken);

    if (accessToken){
      req = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      });
    }

    return next.handle(req || request).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
          if(event.status >= 200 && event.status < 300 && (req||request).method!='GET'){
            if((req||request).url != "http://localhost:8080/api/person/search"
            && (req||request).url != "http://localhost:8080/api/person/photo"
            && (req||request).url != "http://localhost:8080/api/project/photo"){
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Task done succesfully', life: 3000 });
            }
          }
      }
      return event;
  })).pipe(catchError(err => {
    if(err instanceof HttpErrorResponse) {
      console.log(err.error);
      if(err.error[0].messages){
      err.error[0].messages.forEach((element: string) => {
        this.messageService.add({ severity: 'error', summary: "Error", detail: element, life: 3000 });
      });
    }
  }
    const error = err.error.message || err.statusText;
    return throwError(error);
}));
  }
}
