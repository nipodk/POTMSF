import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): string {
    const tokenData = localStorage.getItem(key);
    return tokenData ? JSON.parse(tokenData) : null;
  }
}
