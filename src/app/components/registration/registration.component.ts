import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { AuthenticationServiceService } from '../../services/authentication/authentication-service.service';
import { RegisterRequest } from '../../interfaces/authentication/RegisterRequest';
import { TokenStorageService } from '../../services/storage/token-storage.service';

@Component({
  selector: 'app-registration',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HeaderComponent,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authenticationServiceService:AuthenticationServiceService,
    private tokenStorage: TokenStorageService) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      departmentName: ['', [Validators.required]],
    });
  }

  register(){
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      const registrationRequest: RegisterRequest = {
        firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName,
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
        departmentName: this.registrationForm.value.departmentName
      }
      this.authenticationServiceService.register(registrationRequest)
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
