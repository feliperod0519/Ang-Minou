import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private personBSubject: BehaviorSubject<Person>;
  dummyUser = {id:0,email:'deez.nuts@hotmail.ca',bio:'dummy user'};
  apiUrl = 'http://localhost:8000';

  constructor(private router:Router, private http:HttpClient) { 
    this.personBSubject = new BehaviorSubject(this.dummyUser);
  }

  public getLoggedUser():Observable<Person|null>{
    return this.personBSubject.asObservable();
  }

  public setLoggedUser(p:Person){
    this.personBSubject.next(p);
  }

  public login(email:string,password:string){
    return this.http.post<any>(this.apiUrl + '/api/authenticate',{"email":email,"password":password})
           .pipe(
                  map(x=>{
                            localStorage.setItem('jwtPOC',JSON.stringify(x));
                            this.setLoggedUser(x as Person);
                            return this.getLoggedUser();
                          })
                ) 
  }

  public logout(){
    localStorage.removeItem('jwtPOC');
    this.setLoggedUser(this.dummyUser);
    this.router.navigate(['login']);
  }

}
