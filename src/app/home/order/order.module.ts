import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { OrderProductComponent } from './order-product/order-product.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    OrderComponent,
    OrderProductComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    OrderComponent,
    OrderProductComponent
  ]
})
export class OrderModule { }
