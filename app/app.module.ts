import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { ProfileComponent } from './profile/profile.component';

import { ErrorInterceptor } from '../app/interceptor/error.interceptor';
import { LoggingService } from '../app/services/logging.service';
import { ConsoleLoggingService } from '../app/services/console-logging.service';
import { HomeComponent } from './home/home.component';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [ {provide: LoggingService, useClass: ConsoleLoggingService},
               {provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true}
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
