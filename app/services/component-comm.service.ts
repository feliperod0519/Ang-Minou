import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentCommService {

  email:string='';

  constructor() { 
    this.email = '';
  }
}
