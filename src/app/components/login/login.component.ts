import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { AuthenticationServiceService } from '../../services/authentication/authentication-service.service';
import { AuthenticationRequest } from '../../interfaces/authentication/AuthenticationRequest';
import { TokenStorageService } from '../../services/storage/token-storage.service';

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
    private authenticationServiceService:AuthenticationServiceService,
    private tokenStorage:TokenStorageService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login(){
    if (this.loginForm.valid) {
      const authenticationRequest: AuthenticationRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }

      this.authenticationServiceService.login(authenticationRequest)
        .subscribe((response) => {
            this.tokenStorage.setItem("token", response.token);
          },
          (error) => {
            console.error('There is an error during registration. Try again:', error);
          });
    } else {
      console.log("Some fields aren't correctly filled");
    }

  }
}
