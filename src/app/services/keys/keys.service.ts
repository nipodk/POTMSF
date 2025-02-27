import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeyCreateRequest, KeyCreateResponse, KeyGetRequest } from '../../interfaces/keys/KeyServiceInterface';
import { LocalStorageService } from '../storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class KeysService {
  private authEndpoint:string = 'http://localhost:8080/api/v1/key';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  private getHeaders = ():HttpHeaders => {
    const token: string | null = this.localStorage.getItem("token").trim();
    if(token == null) {
      throw new Error("Doesn't have a JWT");
    }
    return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  })
  };

  public crateKey(keyCreateRequest: KeyCreateRequest): Observable<KeyCreateResponse> {
    return this.http.post<KeyCreateResponse>(`${this.authEndpoint}`, keyCreateRequest, {
      headers: this.getHeaders()
    })
  }

  public getUserKeys(userEmail: string): Observable<KeyGetRequest> {
    return this.http.get<KeyGetRequest>(`${this.authEndpoint}?email=${userEmail}`, {
      headers: this.getHeaders()
    })
  }
}
