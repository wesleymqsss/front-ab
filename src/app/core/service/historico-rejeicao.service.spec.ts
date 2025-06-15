import { TestBed } from '@angular/core/testing';

import { HistoricoRejeicaoService } from './historico-rejeicao.service';

describe('HistoricoRejeicaoService', () => {
  let service: HistoricoRejeicaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricoRejeicaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
