// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';
// import baseUrl from './helper';

// @Injectable({
//   providedIn: 'root',
// })
// export class LoginService {
//   public loginStatusSubject = new Subject<boolean>();

//   constructor(private http: HttpClient) {}

//   //current user: which is loggedin
//   public getCurrentUser() {
//     return this.http.get(`${baseUrl}/current-user`);
//   }

//   //generate token

//   public generateToken(loginData: any) {
//     return this.http.post(`${baseUrl}/generate-token`, loginData);
//   }

//   //login user: set token in localStorage
//   public loginUser(token) {
//     localStorage.setItem('token', token);

//     return true;
//   }

//   //isLogin: user is logged in or not
//   public isLoggedIn() {
//     let tokenStr = localStorage.getItem('token');
//     if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
//       return false;
//     } else {
//       return true;
//     }
//   }

//   // logout : remove token from local storage
//   public logout() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     return true;
//   }

//   //get token
//   public getToken() {
//     return localStorage.getItem('token');
//   }

//   //set userDetail
//   public setUser(user) {
//     localStorage.setItem('user', JSON.stringify(user));
//   }

//   //getUser
//   public getUser() {
//     let userStr = localStorage.getItem('user');
//     if (userStr != null) {
//       return JSON.parse(userStr);
//     } else {
//       this.logout();
//       return null;
//     }
//   }

//   //get user role

//   public getUserRole() {
//     let user = this.getUser();
//     return user.authorities[0].authority;
//   }
// }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  // Get the current logged-in user
  public getCurrentUser(): Observable<any> {
    return this.http.get(`${baseUrl}/current-user`);
  }

  // Generate JWT token
  public generateToken(loginData: any): Observable<any> {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  // Login user: Set token in localStorage
  public loginUser(token: string): boolean {
    if (token) {
      localStorage.setItem('token', token);
      return true;
    }
    return false;
  }

  // Check if the user is logged in
  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && token !== '' && token !== undefined;
  }

  // Logout: Remove token and user details from localStorage
  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loginStatusSubject.next(false); // Notify other components
  }

  // Retrieve the JWT token
  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Set user details in localStorage
  public setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Get user details from localStorage
  public getUser(): any | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  // Get user role from stored user data
  public getUserRole(): string | null {
    const user = this.getUser();
    return user && user.authorities && user.authorities.length > 0
      ? user.authorities[0].authority
      : null;
  }
}
