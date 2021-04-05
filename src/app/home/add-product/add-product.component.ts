import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private productService: ProductsService) {
  }

  ngOnInit(): void {
    this.onInitForm();
  }

  onInitForm(): void {
    this.addProductForm = this.fb.group({
      productName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      imageLink: ['', [Validators.required]]
    })
  }

  add() {
    this.productService.createProduct(this.addProductForm.value).then((response) => {
      // TODO: mostrar aqui la alerta exitosa al registrar un producto
    })
  }
}

