import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { CardDoacoes } from '../interface/cardDoacoes';

@Injectable({
  providedIn: 'root'
})
export class DoacoesService {
  private url = `${environment.api_url}doacao`

  constructor(private http: HttpClient) { }

  getDoacoesCard(id: string): Observable<CardDoacoes[]> {
    return this.http.get<CardDoacoes[]>(`${this.url}/usuario/` + id);
  }

  statusAlter(id: string, status: any): Observable<any>{
    return this.http.patch<any>(`${this.url}/${id}/status`, status);
  }

   realizarDoacao(id: string, responseBody: any): Observable<any>{
    return this.http.post<any>( `${this.url}/${id}`, responseBody)
  }
}
