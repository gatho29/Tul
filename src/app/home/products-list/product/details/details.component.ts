import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  product;
  img: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.product = this.data
    this.getImage(this.product.imageLink)
  }

  getImage(url): void {
    this.img = this.sanitizer.bypassSecurityTrustUrl(url)
  }

}
