import { Component, Input, OnInit, Sanitizer } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';
import { DetailsComponent } from './details/details.component';

export interface Producto {
  nombre: string,
  precio: number,
  candtidad: number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductOnListComponent implements OnInit {

  @Input() product;
  img: any;

  detailsProduct: MatDialogRef<DetailsComponent>

  constructor(
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.getImageLink(this.product.imageLink)
  }

  viewDetails(): void {
    this.detailsProduct = this.dialog.open(DetailsComponent, { width: '550px', height: '390px', data: this.product })

  }

  getImageLink(url) {
    this.img = this.sanitizer.bypassSecurityTrustUrl(url)
  }

  addProduct() {
    Swal.fire({
      title: this.product.productName,
      text: 'Ingrese cantidad',
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Add',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.saveProduct(result.value);
      }
    })
  }

  saveProduct(qty) {
    this.orderService.getPendingCart().subscribe((response) => {
      const id = response.docs[0].id
      this.orderService.addProduct(id, this.product, qty).then((response)=>{
        console.log(response);
        
      })
    })
  }

}
