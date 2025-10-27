import { Component } from '@angular/core';
import { UserDetails } from '../../core/interface/usuario';
import { UsuarioService } from '../../core/service/usuario.service';
import { LoginService } from '../../core/service/login.service';
import { UserLogin } from '../../core/interface/userLogin';
import { SolicitacaoDoacaoService } from '../../core/service/solicitacao-doacao.service';
import { DatePicker } from 'primeng/datepicker';
import { SnackbarService } from '../../core/service/snackbar.service';
import { DoacoesService } from '../../core/service/doacoes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PagamentoService } from '../../core/service/pagamento.service';
import { PayloadPagamentoPix, ResponsePagamentoPix } from '../../core/interface/pagamentoPix';


@Component({
  selector: 'app-listagem-ong-empresa',
  standalone: false,
  templateUrl: './listagem-ong-empresa.component.html',
  styleUrl: './listagem-ong-empresa.component.scss'
})
export class ListagemOngEmpresaComponent {

  gerarQRCode() {
    this.qrCodeImageUrl = null;
    this.qrCodeCopiaECola = null;

    if (this.formPagamentoPix.invalid) {
      this.formPagamentoPix.markAllAsTouched();
      this._snackbarService.showInfo("Formulário inválido.");
      return;
    }

    const payload: PayloadPagamentoPix = this.formPagamentoPix.value;
    if(this.isOng){
      this.solicitarDoacao(payload)
    }
    this.realizarPagamentoPix(payload);

    this.realizarDoacao(payload);
  }

  dataSource: UserDetails[] = [];
  userLogin!: any;
  visible: boolean = false;
  isPix: boolean = true;
  isCartaoCredito: boolean = false;
  formPagamentoPix!: FormGroup;
  formPagamentoCartaoCredito!: FormGroup;
  responsePayloadPagamentoPix!: ResponsePagamentoPix;
  qrCodeImageUrl: string | null = null;
  qrCodeCopiaECola: string | null = null;
  moodalQRCode: boolean = false;
  userSelected: any;
  isOng: boolean =  false;

  constructor(
    private readonly _usuarioService: UsuarioService,
    private readonly _loginService: LoginService,
    private readonly _solicitacaoDoacaoService: SolicitacaoDoacaoService,
    private readonly _snackbarService: SnackbarService,
    private readonly _doacaoService: DoacoesService,
    private readonly _fb: FormBuilder,
    private readonly _pagamentoService: PagamentoService
  ) { }

  ngOnInit() {
    this._loginService.currentUser$.subscribe(user => {
      if (user) {
        console.log('Dados do usuário:', user);
        this.getLoginId(user.id);
      }
    });

    this.formPagamentoPix = this._fb.group({
      valor: [null, Validators.required],
      emailPagador: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
    })
  }

  getLoginId(id: string) {
    this._loginService.getUserId(id).subscribe({
      next: (userLoginResponse) => {
        this.userLogin = userLoginResponse;
        this.userLogin.tipoPerfil === 1 ? this.isOng = true : this.isOng = false;
        this.getDataSource();
      }
    });
  }

  getDataSource() {
    if (this.userLogin.tipoPerfil === 1) {
      this._usuarioService.getUserForProfile(2).subscribe({
        next: (dataSourceResponse) => {
          this.dataSource = dataSourceResponse;
        }
      });
    } else {
      this._usuarioService.getUserForProfile(1).subscribe({
        next: (dataSourceResponse) => {
          this.dataSource = dataSourceResponse;
        }
      });
    }

  }

  converterPerfil(perfil: any) {
    if (perfil === 1) {
      return 'ONG';
    } else {
      return 'Doador'
    }
  }

  obterDataHoraAtual() {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');

    const hora = String(agora.getHours()).padStart(2, '0');
    const minuto = String(agora.getMinutes()).padStart(2, '0');
    const segundo = String(agora.getSeconds()).padStart(2, '0');

    return `${ano}-${mes}-${dia}T${hora}:${minuto}:${segundo}`;
  }

  solicitarDoacao(payloadPagamentoPix: PayloadPagamentoPix) {
    const dataFormatada = this.obterDataHoraAtual();

    const value = {
      solicitante: this.userLogin.nome,
      idSolicitante: this.userLogin.id,
      tipoSolicitacao: this.userSelected.tipoSolicitacao,
      dataSolicitacao: dataFormatada,
      valor: payloadPagamentoPix.valor,
      emailSolicitante: payloadPagamentoPix.emailPagador,
      descricao: payloadPagamentoPix.descricao
    }

    if (value) {
      this._solicitacaoDoacaoService.solicitarDoacao(this.userSelected.id, value).subscribe({
        next: (data) => {
          this._snackbarService.showSuccess("Doação solicitada!");
          console.log('valor do objeto', value);
        }, error: (err) => {
          this._snackbarService.showError("Erro ao solicitar doação.");
          console.log('valor do objeto', value);
        }
      });
    }
  }

  realizarDoacao(payload: PayloadPagamentoPix) {
    const dataFormatada = this.obterDataHoraAtual();
    const value = {
      doador: this.userLogin.nome,
      tipoDoacao: this.userSelected.tipoDoacao,
      dataDoacao: dataFormatada,
      valorTransacao: payload.valor,
      emailPagador: payload.emailPagador,
      tipo: payload.valor,
    }

   
    if (value) {
      this._doacaoService.realizarDoacao(this.userSelected.id, value).subscribe({
        next: () => {
          this._snackbarService.showSuccess("Doação realizada com sucesso!");
          console.log('valor do objeto', value);
        }, error: () => {
          this._snackbarService.showError("Erro ao finalizar doação.");
          console.log('valor do objeto', value);
        }
      });
    }
  }

  openModalPagamento(item: any) {
    this.userSelected = item;
    this.visible = true;
  }

  cloneModalPagamento() {
    this.visible = false;
  }

  realizarPagamentoPix(payload: PayloadPagamentoPix){
     this._pagamentoService.pagamentoPix(payload).subscribe({
      next: (response: ResponsePagamentoPix) => {
        this.responsePayloadPagamentoPix = response;
        const prefixo = 'data:image/png;base64,';
        this.qrCodeImageUrl = prefixo + response.qrCodeBase64;
        this.qrCodeCopiaECola = response.qrCode;
        this.cloneModalPagamento();
        this.moodalQRCode = true;
      },
      error: (err) => {
        console.error("Erro ao gerar QR Code:", err);
      }
    });
  }
}
