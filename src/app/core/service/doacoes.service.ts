import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { CardDoacoes } from '../interface/cardDoacoes';

@Injectable({
  providedIn: 'root'
})
export class DoacoesService {
  private url = `${environment.api_url}doacao/usuario`

  constructor(private http: HttpClient) { }

  getDoacoesCard(id: string): Observable<CardDoacoes[]> {
    return this.http.get<CardDoacoes[]>(`${this.url}/` + id);
  }
}
