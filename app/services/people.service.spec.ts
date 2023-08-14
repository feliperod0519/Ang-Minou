import { TestBed } from '@angular/core/testing';
import { PeopleService } from './people.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Person } from '../models/person';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

describe('PeopleService', () => {
  let peopleService: PeopleService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[PeopleService]
    });
    peopleService = TestBed.inject(PeopleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  xit('should update info', () => {
    const minou: Person = {id:1,email:'minou@cat-tv.ca',bio:'I am a cat'};
    peopleService.updateInfoProfile(minou);
    const req = httpTestingController.expectOne("http://localhost:8000/api/updateInfo");
    expect(req.request.method).toEqual("POST");
    expect(req.request.body.id).toEqual(minou.id);
    expect(req.request.body.email).toEqual(minou.email);
    expect(req.request.body.bio).toEqual(minou.bio);
    req.flush(minou);
  });

  xit('should fail to update info', () => {
    const fakeMinou: Person = {id:9,email:'minou@cat-tv.ca',bio:'I am a cat'};

    
    expect(()=>peopleService.updateInfoProfile(fakeMinou)).toThrow(new HttpErrorResponse({status:500, statusText:'Internal Server Error'}));
    
    const req = httpTestingController.expectOne("http://localhost:8000/api/updateInfo");
    expect(req.request.method).toEqual("POST");
    expect(req.request.body.id).toEqual(fakeMinou.id);
    expect(req.request.body.email).toEqual(fakeMinou.email);
    expect(req.request.body.bio).toEqual(fakeMinou.bio);
    req.flush('Update failed', {
      status:500,
      statusText:'Internal Server Error'           
     });
  });

  afterEach(()=>{
    httpTestingController.verify();
  });
});
