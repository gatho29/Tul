import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginAlert();
  }

  loginAlert() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  login() {
    if (!this.loginForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid email or password'
      });
    } else {
      this.authService.login(this.loginForm.value).then((response) => {
        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Oops...',
            text: `🙌 Welcome ${response?.user?.email}`
          });
          this.router.navigate(['home']);
        }
      }).catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error
        });
      })
    }
  }
}
