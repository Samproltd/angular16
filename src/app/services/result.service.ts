import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) { }

  public addResult(result: any) {
    return this.http.post(`${baseUrl}/result/`, result);
  }

  public sendEmailResult(email: any) {
    const token = localStorage.getItem('authToken'); // Get JWT token from local storage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Add Bearer Token
      'Content-Type': 'application/json'
    });

    return this.http.post(`${baseUrl}/sendingEmail/`, email, { headers });
  }
}
