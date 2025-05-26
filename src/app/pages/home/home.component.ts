import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardDashboard } from '../../core/interface/cardDashboard';
import { CardDoacoes } from '../../core/interface/cardDoacoes';
import { DoacoesService } from '../../core/service/doacoes.service';
import { SnackbarService } from '../../core/service/snackbar.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
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

  userId!: string;
  cards!: CardDashboard[];
  responsiveOptions: any[] | undefined;
  doacoes!: CardDoacoes[];
  visible: boolean = false;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _doacoesService: DoacoesService,
    private readonly _snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.idUser();
    this.obterCardsDashboard();
    this.populandoCarrosel();
  }

  idUser() {
    this.userId = this._route.snapshot.paramMap.get('id')!;
    this.ultimasDoacoes(this.userId);
  }

  obterCardsDashboard() {
    this.cards = [
      { title: 'Total de Doações', value: '35', icon: 'pi-graduation-cap' },
      { title: 'Total de Doacoes pendentes', value: '2', icon: 'pi-users' },
      { title: 'Aumento em 2025', value: '8%', icon: 'pi-thumbs-up' },
      { title: 'Meta', value: '80%', icon: 'pi-thumbs-down' },
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
        this.doacoes = doacoesResponse;
        console.log(this.doacoes);
      }
    })
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
}
