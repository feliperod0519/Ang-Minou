import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Person } from '../models/person';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[AuthenticationService]
    });
    authenticationService = TestBed.inject(AuthenticationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should log in', () => {
    //expect(service).toBeTruthy();
    authenticationService.login('minou@cat-tv.ca','hello').pipe(first()).subscribe((x)=>{
      expect(x).toBeTruthy();
    });
    const req = httpTestingController.expectOne("http://localhost:8000/api/authenticate");
    expect(req.request.method).toEqual("POST");
    expect(req.request.body.email).toEqual('minou@cat-tv.ca');
    expect(req.request.body.password).toEqual('hello');
    req.flush({...{"id":0,"email":'',"bio":""},...{"id":1,"email":'minou@cat-tv.ca',"bio":'soy un gato'}})
  });

  it('should give an error if login info is incorrect',()=>{
    authenticationService.login('minou@cat-tv.ca','hello-').pipe(first()).subscribe(
      ()=>{fail('login failed');},
      (err:HttpErrorResponse)=>{ expect(err.status).toBe(403); }
    );
    const req = httpTestingController.expectOne("http://localhost:8000/api/authenticate");
    expect(req.request.method).toEqual("POST");
    expect(req.request.body.email).toEqual('minou@cat-tv.ca');
    expect(req.request.body.password).toEqual('hello-');
    req.flush('Login failed', {
                                      status:403,
                                      statusText:'Unauthenticated'           
                              });
  });

  afterEach(()=>{
    httpTestingController.verify();
  });
});

