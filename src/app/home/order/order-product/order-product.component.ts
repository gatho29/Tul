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
    this.getImageLink(this.product.imageLink)
  }

  getImageLink(url): void {
    this.img = this.sanitizer.bypassSecurityTrustUrl(url)
  }

  removeProduct(product) {
    this.orderService.getPendingCart().subscribe((response) => {
      const id = response.docs[0].id
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#209cee',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.orderService.removeProduct(product.id).then(() => {
            Swal.fire({ icon: 'success', title: 'Success', text: 'Product removed', confirmButtonColor: '#209cee' })
          }).catch(error => Swal.fire({ icon: 'error', title: 'Error!', text: error.message }))
        }
      })

    })
  }
}