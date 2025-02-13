import { Injectable } from '@angular/core';
import { RegisterRequest } from '../../interfaces/authentication/RegisterRequest';
import { HttpClient } from '@angular/common/http';
import { AuthenticationResponse } from '../../interfaces/authentication/AuthenticationResponse';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from '../../interfaces/authentication/AuthenticationRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  private authEndpoint:string = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) { }

  public register(registerRequest: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.authEndpoint}/register`, registerRequest)
  }

  public login(loginRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.authEndpoint}/login`, loginRequest)
  }

}
