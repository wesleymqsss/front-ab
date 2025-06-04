import { TestBed } from '@angular/core/testing';

import { SolicitacaoDoacaoService } from './solicitacao-doacao.service';

describe('SolicitacaoDoacaoService', () => {
  let service: SolicitacaoDoacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitacaoDoacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
