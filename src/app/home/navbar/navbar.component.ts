import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component'
import { OrderComponent } from '../order/order.component'
import { Router } from '@angular/router';
import { StatusDeliveryComponent } from '../../home/status-delivery/status-delivery.component'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  orderDialogRef: MatDialogRef<OrderComponent>
  addProductDialogRef: MatDialogRef<AddProductComponent>
  statusProductDialogRef: MatDialogRef<StatusDeliveryComponent>

  constructor(
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.orderDialogRef && this.orderDialogRef.close();
    this.addProductDialogRef && this.addProductDialogRef.close();
    this.statusProductDialogRef && this.statusProductDialogRef.close();
  }

  viewOrder(): void {
    this.orderDialogRef = this.dialog.open(OrderComponent, { width: '600px' });
  }

  addProduct(): void {
    this.addProductDialogRef = this.dialog.open(AddProductComponent, { width: '550px', height: '480px' })
  }

  statusPruduct(): void {
    this.statusProductDialogRef = this.dialog.open(StatusDeliveryComponent, { width: '550px', height: '480px' })
  }

  logout(): void {
    this.router.navigate(['login']);
  }
}
