import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly URL_API = this.config.getConfig().url
  constructor(private http: HttpClient, private config:ConfigService) { }

 

  public getUsers(){
    const headers = new HttpHeaders({
      'x-token': 'beare token'
    })
    return this.http.get(`${this.URL_API}/usuarios`, {headers});
  }

  getUser( id: String ){
    const headers = new HttpHeaders({
      'x-token': 'beare token'
    })
    return this.http.get(this.URL_API + '/usuarios/'+id, {headers});
  }
  public newUser(user: any) {
    return this.http.post(`${this.URL_API}/usuarios`, user);
  }

  public updateUser( id: any, user: any ){
    return this.http.put(`${this.URL_API}/usuarios/`+id, user);
  }
  deleteUser( id: String ){
    return this.http.delete(this.URL_API + '/usuarios/eliminar/'+id );
  }
}