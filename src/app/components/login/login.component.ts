import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { AuthenticationRequest } from '../../interfaces/authentication/AuthenticationRequest';
import { LocalStorageService } from '../../services/storage/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HeaderComponent,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authenticationServiceService: AuthenticationService,
    private localStorageService: LocalStorageService,
    private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public login(){
    if (this.loginForm.valid) {
      const authenticationRequest: AuthenticationRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      this.authenticationServiceService.login(authenticationRequest)
        .subscribe((response) => {
            this.localStorageService.setItem("token", response.token);
            this.localStorageService.setItem("email", authenticationRequest.email);
            this.localStorageService.setItem("isLogged", true);
            this.router.navigate(['/ordersMonitoring']);
          },
          (error) => {
            console.error('There is an error duchring login. Try again:', error);
          });
    } else {
      console.log("Some fields aren't correctly filled");
    }

  }
}
