import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
{ path: 'home', component: MainComponent },
{ path: 'customer', component: CustomerComponent }, 
{ path: '',   redirectTo: '/customer', pathMatch: 'full' }, // redirect to `first-component`
   ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
