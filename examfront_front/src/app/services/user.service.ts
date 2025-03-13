import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //add user

  public addUser(user: any) {
    return this.http.post(`${baseUrl}/user/`, user);
  }
  public getAllUser() {
    return this.http.get(`${baseUrl}/user/`, );
  }
  getStudentById(studentId: string) {
    return this.http.get(`http://yourbackend.com/api/students/${studentId}`);
  }


}
