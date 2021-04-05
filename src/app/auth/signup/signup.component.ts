import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.singAlert();
  }

  singAlert() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  signup() {
    if (!this.signupForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required'
      })
      return
    }
    this.authService.signUp(this.signupForm.value).then((user) => {
      this.snackBar.open(`🙌 Welcome ${user?.email}`, '', { duration: 2000 })
      this.orderService.createPendingCart();
      this.router.navigate(['home']);
    }).catch(error => {
      this.snackBar.open(`😢 ${error}`, '', { duration: 5000 })
    })
  }
}
