import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  dummyUser = {id:0,email:'deez.nuts@hotmail.ca',bio:'dummy user'};
  currentUser: Person = this.dummyUser;

  constructor(private router:Router, private authService: AuthenticationService){}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    this.authService.getLoggedUser().subscribe((p:Person|null)=>
    {
      console.log('Auth:' + p?.id);
      this.currentUser = p as Person;
    });
    if (this.currentUser.id === this.dummyUser.id){
      
      this.router.navigate([''],{queryParams:{from:state.url}});
    }
    console.log(this.currentUser.email);
    return true;
  }
  
}
