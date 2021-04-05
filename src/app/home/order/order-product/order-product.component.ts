import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.scss']
})
export class OrderProductComponent implements OnInit {

  @Input() product;
  @Input() quantity;
  img: any;

  constructor(private sanitizer: DomSanitizer, private orderService: OrderService) { }

  ngOnInit(): void {
    console.log(this.product);
    this.getImageLink(this.product.imageLink)
  }

  getImageLink(url): void {
    this.img = this.sanitizer.bypassSecurityTrustUrl(url)
  }

  removeProduct(product) {
    console.log(product);
    this.orderService.getPendingCart().subscribe((response) => {
      const id = response.docs[0].id
      this.orderService.removeProduct(product.id, product.uid).then((response) => {
        console.log(response);
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Brilliant',
        //   text: 'Your product was removed to the cart',
        // })
      }).catch(error => {
        console.log(error);
      })
    })
  }
}