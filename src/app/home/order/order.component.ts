import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  products = [];
  cart: any;
  totalCart = { total: 0 }

  listSubscription = new Subscription()

  constructor(private productService: ProductsService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getProducts(cartId): void {
    this.listSubscription = this.productService.getProductsByCart(cartId).subscribe((products) => {
      this.products = products;
      this.calculateTotal();

    })
  }

  ngOnDestroy() {
    this.listSubscription.unsubscribe();
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

  calculateTotal() {
    this.totalCart = this.products.reduce((acc, product) => {
      return { total: acc.total + parseInt(product.productId.price) * parseInt(product.qty) }
    }, { total: 0 })
  }

}
