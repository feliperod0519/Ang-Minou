import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { AppComponent } from './app.component';
import { AuthGuard } from '../app/guards/auth.guard';
import { ProfileComponent } from '../app/profile/profile.component';
import {HomeComponent} from '../app/home/home.component';

const routes: Routes = [
                        {path:'',component:HomeComponent},
                        {path:'Profile',component:ProfileComponent,canActivate:[AuthGuard]},
                        {path:'**', redirectTo:''}
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
