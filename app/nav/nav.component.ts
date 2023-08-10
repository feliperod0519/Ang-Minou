import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Person } from '../models/person';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  isUserLogged=false;
  @Output('emailChanged') userNameUpdated = new EventEmitter<string>();
  loggedMail='';

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    this.isUserLogged=false;
  }

  login(){
    console.log(this.model);
    this.authService.login(this.model.username,this.model.password).
        pipe(first()).
        subscribe({next:()=>{
                              this.isUserLogged=true;
                              this.userNameUpdated.emit(this.model.username);
                              this.loggedMail = this.model.username;
                              this.router.navigate(['Profile']);
                            }
                  });
  }

  logOut(){
    console.log("logOut");
    this.authService.logout();
    this.isUserLogged=false;
    this.loggedMail = ''
    this.userNameUpdated.emit(this.authService.dummyUser.email);
    this.router.navigate(['']);
  }  
}
