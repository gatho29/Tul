import { Component, Input, OnInit, Sanitizer } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
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

  constructor(private dialog: MatDialog,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getImageLink(this.product.imageLink)
  }

  viewDetails(): void {
    this.detailsProduct = this.dialog.open(DetailsComponent, { width: '550px', height: '390px', data: this.product})

  }

  getImageLink(url) {
    this.img = this.sanitizer.bypassSecurityTrustUrl(url)
  }

}
