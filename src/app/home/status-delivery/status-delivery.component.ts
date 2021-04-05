import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-status-delivery',
  templateUrl: './status-delivery.component.html',
  styleUrls: ['./status-delivery.component.scss']
})
export class StatusDeliveryComponent implements OnInit {

  orders: any;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe((response) => {
      this.orders = response.docs.map(order => order.data())
    })
  }

}
