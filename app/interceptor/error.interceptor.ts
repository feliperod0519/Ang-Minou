import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, noop } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggingService } from '../services/logging.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private loggingService: LoggingService, private authService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((e:HttpErrorResponse)=>
      {
        if ([401, 403].includes(e.status)) {
          this.authService.logout();
        }
        this.loggingService.log(`${e.error.message || e.statusText}`);
        return throwError(()=> new Error(e.error.message));
      })
    );
  }
}
