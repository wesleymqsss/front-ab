import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetails } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private url = `${environment.api_url}usuario`

  constructor(private http: HttpClient) { }

  getUserDetails(userId: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.url}/` + userId)
  }

  userDetailsUpdate(id: string, responseBody: any): Observable<any> {
    const urlId = `${this.url}/${id}`
    return this.http.put<any>(urlId, responseBody);
  }

  createUser(responseBody: any): Observable<any>{
    return this.http.post<any>(`${this.url}`, responseBody);
  }
}
