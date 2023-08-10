import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ComponentCommService } from '../app/services/component-comm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Felipe-Rod-POC';
  loggedUser = ''
 
  constructor(private http: HttpClient, private commComponentService: ComponentCommService ){
  }

  ngOnInit(): void {
    this.loggedUser = '';
  }

  onEmailChanged(email:string){
    this.loggedUser = email;
    this.commComponentService.email = this.loggedUser;
  }
}
