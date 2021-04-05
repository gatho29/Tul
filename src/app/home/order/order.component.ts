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

  products = [];
  cart: any;

  constructor(private productService: ProductsService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.getCart()
  }

  getProducts(cartId): void {
    this.productService.getProductsByCart(cartId).subscribe((response) => {
      this.products = response.docs.map(d => {
        return { ...d.data() as any, id: d.id };
      });
      console.log(this.products);
    })
  }

  buyOrder(): void {
    this.orderService.buy(this.cart.uid).then(() => {
      this.orderService.createPendingCart();
      this.getCart();
      Swal.fire({
        icon: 'success', title: 'Completed', text: 'Thanks'
      });
    })
  }

  getCart(): void {
    this.orderService.getPendingCart().subscribe((response) => {
      this.getProducts(response.docs[0].id)
      this.cart = { ...response.docs[0].data() as any, uid: response.docs[0].id }
    })
  }

  getProduct(product: any): any {
    return {
      id: product.id,
      ...product.productId,
    }
  }

}
