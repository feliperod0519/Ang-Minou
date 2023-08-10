import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Person } from '../models/person';

import { first } from 'rxjs/operators';
import { PeopleService } from '../services/people.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editProfileForm: FormGroup = new FormGroup({});

  constructor(private authenticationService:AuthenticationService,
              private peopleService: PeopleService, private router:Router) {  
  }
  
  ngOnInit(): void {
    let p = this.authenticationService.dummyUser;
    this.authenticationService.getLoggedUser().pipe(first())
                                              .subscribe({  next:(x)=>{
                                                                        p=x as Person;
                                                                        console.log(p);
                                                                      }
                                                          });
    this.editProfileForm = new FormGroup({
                                          'id':new FormControl(p.id),
                                          'email': new FormControl(p.email),
                                          'bio': new FormControl(p.bio)
                                         });
  }

  onSubmit(){
    var p: Person = this.editProfileForm.value;
    this.peopleService.updateInfoProfile(p);
    this.router.navigate(['']);
  }

}
