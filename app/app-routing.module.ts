import { NgModule } from '@angular/core';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { SpecialComponent } from './special/special.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
  path:'',
  redirectTo:'events',
  pathMatch:'full'
  },

  {
  path:'events',
    component:EventsComponent
  },

  {
    path:'login',
    component:LoginComponent
  },
  { 
    path:'special',
    component:SpecialComponent
  },
  { 
    path:'signup',
    component:RegisterComponent
  },

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
