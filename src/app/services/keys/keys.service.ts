import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  KeyCreateRequest,
  KeyCreateResponse,
  KeyGetResponse,
  KeyUpdateRequest, KeyUpdateResponse, KeyDeleteResponse, KeyDto
} from '../../interfaces/keys/KeyServiceInterface';
import { LocalStorageService } from '../storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class KeysService {
  private authEndpoint:string = 'http://localhost:8080/api/v1/keys';
  private keyAddedSource = new Subject<KeyDto>();
  keyAdded$ = this.keyAddedSource.asObservable();


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

  public getUserKeys(userEmail: string): Observable<KeyGetResponse> {
    return this.http.get<KeyGetResponse>(`${this.authEndpoint}?email=${userEmail}`, {
      headers: this.getHeaders()
    })
  }

  public updateUserKey(keyUpdateRequest: KeyUpdateRequest): Observable<KeyUpdateResponse> {
    return this.http.put<KeyUpdateResponse>(`${this.authEndpoint}`,keyUpdateRequest, {
      headers: this.getHeaders()
    })
  }

  public deleteUserKey(userEmail: string, keyName: string): Observable<KeyDeleteResponse>  {
    return this.http.delete<KeyDeleteResponse>(`${this.authEndpoint}?userEmail=${userEmail}&keyName=${keyName}`, {
  headers: this.getHeaders()
})
  }
  public notifyKeyAddition(newKey: KeyDto) {
    this.keyAddedSource.next(newKey);
  }
}
