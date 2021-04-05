import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products;
  cart;

  constructor(
    private productService: ProductsService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
   this.getCart()
  }

  getProducts(cartId) {
    this.productService.getProductsByCart(cartId).subscribe((response) => {
      console.log(response.docs.map(d => (d.data())));
      this.products = response.docs.map(d => (d.data()));
    })
  }

  buyOrder() {
    this.orderService.buy(this.cart.uid).then(()=>{
      this.orderService.createPendingCart();
      this.getCart();
      Swal.fire({
        icon: 'success',
        title: 'Completed',
        text: 'Thanks'
      })
    })
  }

getCart(){
  this.orderService.getPendingCart().subscribe((response) => {
    this.getProducts(response.docs[0].id)
    this.cart = {...response.docs[0].data() as any, uid:response.docs[0].id}
  })
}

}
