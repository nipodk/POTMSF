import { Injectable } from '@angular/core';
import { RegisterRequest } from '../../interfaces/authentication/RegisterRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationResponse } from '../../interfaces/authentication/AuthenticationResponse';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from '../../interfaces/authentication/AuthenticationRequest';
import { LocalStorageService } from '../storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authEndpoint:string = 'http://localhost:8080/api/v1/auth';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
    ) { }

  private getHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  public register(registerRequest: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.authEndpoint}/register`, registerRequest)
  }

  public login(loginRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.authEndpoint}/login`, loginRequest)
  }

  public logOut(): void {
    this.localStorageService.setItem("isLogged", false);
    this.localStorageService.removeItem("token");
    this.localStorageService.removeItem("email");
  }
}
