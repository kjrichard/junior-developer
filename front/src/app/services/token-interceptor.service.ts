import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import {AuthService} from './auth.service'



@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req, next) {
    let tokenizeReq = req.clone({
      setHeaders: { Authorization: `${this.authService.getToken()}`
      }
    });
   // console.log(this.authService.getToken(), 'jsjs');
    
    return next.handle(tokenizeReq);
  }

}