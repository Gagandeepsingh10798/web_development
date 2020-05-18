import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private cookieService: CookieService, private http: HttpClient) { }

  getProdcuts(): Observable<any> {
    return this.http.get('http://localhost:3000/api/auth/home');
  }
}
