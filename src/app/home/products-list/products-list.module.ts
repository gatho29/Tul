import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ProductListComponent } from './products-list.component';
import { ProductOnListComponent } from './product/product.component';
import { DetailsComponent } from './product/details/details.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductOnListComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    ProductListComponent,
    ProductOnListComponent
  ]
})
export class ProductsListModule { }
