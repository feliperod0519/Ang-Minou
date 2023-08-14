import { TestBed } from '@angular/core/testing';

import { LoggingInterceptor } from './logging.interceptor';

xdescribe('LoggingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoggingInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LoggingInterceptor = TestBed.inject(LoggingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
