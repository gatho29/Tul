import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
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
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.onInitForm();
  }

  onInitForm() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signup() {
    if (!this.signupForm.valid) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'All fields are required' });
    } else {
      this.authService.signUp(this.signupForm.value).then((user) => {
        Swal.fire({
          icon: 'success',
          title: '🙌 Welcome',
          text: user?.email
        });
        this.router.navigate(['home']);
        this.orderService.createPendingCart();
        this.router.navigate(['home']);
      }).catch(error => {
        Swal.fire({ icon: 'error', title: 'Oops...', text: error });
      });
    }
  }
}
