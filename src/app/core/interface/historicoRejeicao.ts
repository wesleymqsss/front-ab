export interface SolicitacaoDoacaoHistorico {
  id: string;
  solicitante: string;
  idSolicitante: string;
  tipoSolicitacao: string;
  dataSolicitacao: string; 
  usuario: UsuarioHistorico; 
  dataRejeicao: string; 
}

export interface UsuarioHistorico {
  id: string;
  email: string;
  senha?: string; 
  tipoPerfil: number;
  nome: string;
  cpfCnpj: string;
  cep: string;
  telefone: string;
  cidade: string;
  tipoDoacao: string;
  bairro: string;
  numero: number;
  referenciaEndereco: string;
  estado: string;
  sobreNos: string;
}

export interface HistoricoRejeicaoItem {
  tipoSolicitacao: string;
  dataRejeicao: string; 
  dataSolicitacao: string; 
  nome: string; 
  cidade: string; 
  estado: string; 
}

export interface SolicitacaoBeneficiadoItem {
  solicitante: string; 
  tipoSolicitacao: string;
  dataSolicitacao: string; 
  dataRejeicao?: string; 
}