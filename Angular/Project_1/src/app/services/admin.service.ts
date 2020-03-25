import { Injectable, KeyValueDifferFactory } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    token: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  setHeader() {
    httpOptions.headers =
    httpOptions.headers.set('token', this.cookieService.get('token'));
  }

  getUsers(): Observable<any> {
    this.setHeader();
    return this.http.get('http://localhost:3000/api/users/all', httpOptions);
  }

  registerUser(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/auth/register', data);
  }

  loginUser(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/auth/login', data);
  }

  getUser(): Observable<any> {
    this.setHeader();
    return this.http.get('http://localhost:3000/api/users', httpOptions);
  }

  getUserr(data: any): Observable<any> {
    this.setHeader();
    return this.http.get('http://localhost:3000/api/users/get/' + data._id, httpOptions);
  }

  updateUserr( id: any, data: any): Observable<any> {
    this.setHeader();
    return this.http.put('http://localhost:3000/api/users/' + id, data, httpOptions);
  }


  delUser(data: any): Observable<any> {
    return this.http.delete('http://localhost:3000/api/users/delete/' + data._id, httpOptions);
  }




  delProd(data: any): Observable<any> {
    return this.http.delete('http://localhost:3000/api/products/' + data._id, httpOptions);
  }


  getProds(): Observable<any> {
    this.setHeader();
    return this.http.get('http://localhost:3000/api/products/all/get', httpOptions);
  }

  constructor(private cookieService: CookieService, private http: HttpClient) { }
}
