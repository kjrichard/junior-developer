import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from './config.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api'

  readonly URL_API = this.config.getConfig().url
  constructor(private http: HttpClient, private config:ConfigService, private router: Router) { }

  public login(user: any) {
    return this.http.post(`${this.URL_API}/auth`, user);
  }

  loggedInd() {
   return !!localStorage.getItem('token');
  }

 
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(){
    return localStorage.getItem('token');
  }

}

