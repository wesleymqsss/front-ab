export interface PayloadPagamentoPix {
    valor: number;
    descricao: string;
    emailPagador: string;
}

export interface ResponsePagamentoPix{
    qrCodeBase64: string;
    qrCode: string;
}
