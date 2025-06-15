import { Component } from '@angular/core';
import { UserDetails } from '../../core/interface/usuario';
import { UsuarioService } from '../../core/service/usuario.service';
import { LoginService } from '../../core/service/login.service';
import { UserLogin } from '../../core/interface/userLogin';
import { SolicitacaoDoacaoService } from '../../core/service/solicitacao-doacao.service';
import { DatePicker } from 'primeng/datepicker';
import { SnackbarService } from '../../core/service/snackbar.service';
import { DoacoesService } from '../../core/service/doacoes.service';


@Component({
  selector: 'app-listagem-ong-empresa',
  standalone: false,
  templateUrl: './listagem-ong-empresa.component.html',
  styleUrl: './listagem-ong-empresa.component.scss'
})
export class ListagemOngEmpresaComponent {

  dataSource: UserDetails[] = [];
  userLogin!: any;

  constructor(
    private readonly _usuarioService: UsuarioService,
    private readonly _loginService: LoginService,
    private readonly _solicitacaoDoacaoService: SolicitacaoDoacaoService,
    private readonly _snackbarService: SnackbarService,
    private readonly _doacaoService: DoacoesService
  ) { }

  ngOnInit() {
    this._loginService.currentUser$.subscribe(user => {
      if (user) {
        console.log('Dados do usuário:', user);
        this.getLoginId(user.id);
      }
    });
  }

  getLoginId(id: string) {
    this._loginService.getUserId(id).subscribe({
      next: (userLoginResponse) => {
        this.userLogin = userLoginResponse;
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

  solicitarDoacao(id: string, tipoDoacao: string) {
    const dataFormatada = this.obterDataHoraAtual();
    const value = {
      solicitante: this.userLogin.nome,
      idSolicitante: this.userLogin.id,
      tipoSolicitacao: tipoDoacao,
      dataSolicitacao: dataFormatada
    }

    if (value) {
      this._solicitacaoDoacaoService.solicitarDoacao(id, value).subscribe({
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

  realizarDoacao(id: string, tipoDoacao: string) {
    const dataFormatada = this.obterDataHoraAtual();
    const value = {
      doador: this.userLogin.nome,
      tipoDoacao: tipoDoacao,
      dataDoacao: dataFormatada
    }
    if (value) {
      this._doacaoService.realizarDoacao(id, value).subscribe({
        next: (data) => {
          this._snackbarService.showSuccess("Doação realizada com sucesso!");
          console.log('valor do objeto', value);
        }, error: (err) => {
          this._snackbarService.showError("Erro ao finalizar doação.");
          console.log('valor do objeto', value);
        }
      });
    }

  }

}
