import { TestBed } from '@angular/core/testing';

import { HttpPersonInterceptor } from './http-person.interceptor';

xdescribe('HttpPersonInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpPersonInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpPersonInterceptor = TestBed.inject(HttpPersonInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
