import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Person } from '../models/person';
import { tap, catchError } from 'rxjs/operators';
import {Observable,throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  apiUrl = 'http://localhost:8000';

  //https://angular.io/guide/http-handle-request-errors
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new HttpErrorResponse({status:500, statusText:'Internal Server Error :)'}));
  }

  constructor(private http:HttpClient) { }

  public updateInfoProfile(person:Person):void{
    this.http.post<any>(this.apiUrl + '/api/updateInfo',person)
           .pipe(tap(x=>'updating'),
                 catchError(this.handleError)).subscribe(x=>{console.log(x);})
  }
}
