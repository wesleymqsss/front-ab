import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Logged, Login, UserLogin } from '../interface/userLogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = `${environment.api_url}usuario/login`
  
  constructor(private http : HttpClient) { }

  getUserLogin(user: Login ): Observable<Logged>{
    return this.http.post<Logged>(`${this.url}`, user)
  }

  getUserId(id: number): Observable<UserLogin>{
    return this.http.get<UserLogin>(`${this.url + id}`);
  }

  updateUser(id: number, user: any): Observable<any>{
    return this.http.put<any>(`${this.url + id}`, user)
  }
}
