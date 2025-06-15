import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolicitacaoDoacaoHistorico } from '../interface/historicoRejeicao';

@Injectable({
  providedIn: 'root'
})
export class HistoricoRejeicaoService {

  private url = `${environment.api_url}historico`

  constructor(private http: HttpClient) { }

  getHistoricoRejeicaoSolicitante(userId: string): Observable<SolicitacaoDoacaoHistorico[]> {
    return this.http.get<SolicitacaoDoacaoHistorico[]>(`${this.url}/solicitante/` + userId)
  }

  getHistoricoRejeicaoBeneficiado(userId: string): Observable<SolicitacaoDoacaoHistorico[]> {
    return this.http.get<SolicitacaoDoacaoHistorico[]>(`${this.url}/beneficiado/` + userId)
  }
  
}
