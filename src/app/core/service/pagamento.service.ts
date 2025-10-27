import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PayloadPagamentoPix, ResponsePagamentoPix } from '../interface/pagamentoPix';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {
  private url = `${environment.api_url}pagamento/`

  constructor(private _http: HttpClient) { }

  pagamentoPix(payload: PayloadPagamentoPix): Observable<ResponsePagamentoPix>{
    return this._http.post<ResponsePagamentoPix>(`${this.url}pix`, payload);
  }
}
