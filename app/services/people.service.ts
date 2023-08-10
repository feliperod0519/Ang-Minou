import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Person } from '../models/person';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  apiUrl = 'http://localhost:8000';

  constructor(private http:HttpClient) { }

  public updateInfoProfile(person:Person):void{
    this.http.post<any>(this.apiUrl + '/api/updateInfo',person)
           .pipe(tap(x=>'updating')).subscribe(x=>{console.log(x);})
  }
}
