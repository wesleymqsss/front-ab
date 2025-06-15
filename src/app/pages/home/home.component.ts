import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardDashboard } from '../../core/interface/cardDashboard';
import { CardDoacoes } from '../../core/interface/cardDoacoes';
import { DoacoesService } from '../../core/service/doacoes.service';
import { SnackbarService } from '../../core/service/snackbar.service';
import { LoginService } from '../../core/service/login.service';
import { SolicitacaoDoacaoService } from '../../core/service/solicitacao-doacao.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  userLogin: any;
  userId!: string;
  cards!: CardDashboard[];
  responsiveOptions: any[] | undefined;
  doacoes!: CardDoacoes[];
  visible: boolean = false;
  dataSource: any[] = [];

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _doacoesService: DoacoesService,
    private readonly _snackbarService: SnackbarService,
    private readonly _router: Router,
    private readonly _loginService: LoginService,
    private readonly _solicitacaoDoacaoService: SolicitacaoDoacaoService
  ) { }

  ngOnInit() {
    this.idUser();
    this.obterCardsDashboard();
    this.populandoCarrosel();

    this._loginService.currentUser$.subscribe(user => {
      if (user) {
        console.log('Dados do usuário:', user);
        this.getLoginId(user.id);
      }
    });

  }

  rejeitarDoacao(id: string, statusAtual: string) {
    const status = {
      status: "cancelado"
    }

    if (statusAtual === status.status) {
      this._snackbarService.showContrast("Doação já está rejeitada!");
    } else {
      this._doacoesService.statusAlter(id, status).subscribe({
        next: (data) => {
          this._snackbarService.showSuccess("Doação aceita com sucesso!");
          window.location.reload();
        }
      });
    }
  }

  aceitarDoacao(id: string, statusAtual: string) {
    const status = {
      status: "aprovado"
    }

    if (statusAtual === status.status) {
      this._snackbarService.showContrast("Doação já está aprovada!");
    } else {
      this._doacoesService.statusAlter(id, status).subscribe({
        next: (data) => {
          this._snackbarService.showSuccess("Doação aceita com sucesso!");
          window.location.reload();
        }
      });
    }
  }

  getLoginId(id: string) {
    this._loginService.getUserId(id).subscribe({
      next: (userLoginResponse) => {
        this.userLogin = userLoginResponse;
        if (this.userLogin.tipoPerfil === 1) {
          this.ultimasDoacoes(this.userLogin.id);
          console.log('this.userLogin.id na service: ', this.userLogin.id)
        } else {
          this.ultimasSolicitacoes(this.userLogin.id);
          console.log('this.userLogin.id na service: ', this.userLogin.id)
        }

      }
    });
  }

  idUser() {
    this.userId = this._activatedRoute.snapshot.paramMap.get('id')!;
  }

  obterCardsDashboard() {
    this.cards = [
      { title: 'Total de Doações', value: '35', icon: 'pi-bullseye' },
      { title: 'Total de Doacoes pendentes', value: '2', icon: 'pi-users' },
      { title: 'Aumento em 2025', value: '8%', icon: 'pi-chart-line' },
      { title: 'Meta', value: '80%', icon: 'pi-chart-pie' },
    ];
  }

  populandoCarrosel() {
    this.responsiveOptions = [
      {
        breakpoint: '1920px',
        numVisible: 4,
        numScroll: 1
      },
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '1024px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ultimasDoacoes(id: string) {
    this._doacoesService.getDoacoesCard(id).subscribe({
      next: (doacoesResponse) => {
        this.dataSource = doacoesResponse;
        console.log(this.dataSource);
      }
    });
  }

  ultimasSolicitacoes(id: string) {
    this._solicitacaoDoacaoService.getSolicitacoesCard(id).subscribe({
      next: (solicitacaoDoacaoResponse) => {
        this.dataSource = solicitacaoDoacaoResponse;
        console.log(this.dataSource)
      }
    });
  }

  onModalAlunos() {
    this.visible = true;
  }

  onModalProva() {
    this.visible = true;
  }

  typeStatusColor(status: string) {
    const classPendente = "status-pendente";
    const classAprovado = "status-aprovado";
    const classCancelado = "status-cancelado";

    if (status === "pendente") {
      return classPendente;
    } else if (status === "aprovado") {
      return classAprovado;
    } else {
      return classCancelado;
    }
  }

  routerPageList() {
    this._router.navigate(['/listagem-ong-empresa']);
  }

  rejeitarPedidoDoacao(id: string) {
    this._solicitacaoDoacaoService.deletar(id).subscribe({
      next: (data) => {
        this._snackbarService.showInfo('Solitação de doação rejeitada!');
        window.location.reload();
      }, error: (err) => {
        this._snackbarService.showWarn('Não foi possivel rejeitar a doação.');
      }
    })
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


  realizarDoacao(id: string, tipoDoacao: string) {
    const dataFormatada = this.obterDataHoraAtual();
    const value = {
      doador: this.userLogin.nome,
      tipoDoacao: tipoDoacao,
      dataDoacao: dataFormatada
    }
    if (value) {
      this._doacoesService.realizarDoacao(id, value).subscribe({
        next: (data) => {
          this._snackbarService.showSuccess("Doação realizada com sucesso!");
        
        }, error: (err) => {
          this._snackbarService.showError("Erro ao finalizar doação.");
         
        }
      });
    }

  }
}
