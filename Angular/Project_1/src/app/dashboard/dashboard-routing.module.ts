import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddproductComponent } from './addproduct/addproduct.component';
const routes: Routes = [{
  path: '',
  component: DashboardComponent
},
{
  path: 'users',
  component: UsersComponent
},
{
  path: 'products',
  component: ProductsComponent
},
{
  path: 'adduser',
  component: AdduserComponent
},
{
  path: 'edituser/:id',
  component: AdduserComponent
},
{
  path: 'addproduct',
  component: AddproductComponent
},
{
  path: 'editproduct/:id',
  component: AddproductComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
