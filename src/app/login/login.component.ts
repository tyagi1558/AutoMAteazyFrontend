import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';


// Define a type for the logo object
type LogoMap = {
  [key: string]: string;
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';
  isLoginButtonLoading: boolean = false;


  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private primengConfig: PrimeNGConfig,private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;  // Enable ripple effect for buttons
  }

 

  login() {
    if (this.loginForm.valid) {
      this.isLoginButtonLoading = true;
      const { username, password } = this.loginForm.value;

      this.apiService.login(username, password).pipe( finalize(() => {
        this.isLoginButtonLoading=false;
    }
      )).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.result.token);
          this.router.navigate(['/leads']);
          this.isLoginButtonLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Invalid credentials';
          this.isLoginButtonLoading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login Failed' });
        },
      });
    } else {
      this.loginForm.markAllAsTouched();  // Mark form fields as touched if invalid
    }
  }
}
