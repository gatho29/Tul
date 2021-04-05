import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-order-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class OrderProductComponent implements OnInit {

  @Input() product;
  @Input() quantity;
  img: any;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getImageLink(this.product.imageLink)
  }

  getImageLink(url) {
    this.img = this.sanitizer.bypassSecurityTrustUrl(url)
  }
}
