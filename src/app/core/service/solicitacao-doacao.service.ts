import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoDoacaoService {
  private url = `${environment.api_url}solicitacao`;
  
  constructor(private http: HttpClient) { }

  solicitarDoacao(id: string, responseBody: any): Observable<any>{
    return this.http.post<any>( `${this.url}/${id}`, responseBody)
  }
}
