import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material.module';
import { AddProductComponent } from './add-product/add-product.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProductsListModule } from './products-list/products-list.module';
import { OrderModule } from './order/order.module';
import { LoginComponent } from '../auth/login/login.component';
import { StatusDeliveryComponent } from './status-delivery/status-delivery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
];

@NgModule({
  declarations: [
    NavbarComponent,
    AddProductComponent,
    HomeComponent,
    StatusDeliveryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ProductsListModule,
    OrderModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HomeModule { }
