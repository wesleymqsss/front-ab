import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardDashboard } from '../../core/interface/cardDashboard';
import { CardDoacoes } from '../../core/interface/cardDoacoes';
import { DoacoesService } from '../../core/service/doacoes.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
aceitarDoacao() {
throw new Error('Method not implemented.');
}

  userId!: string;
  cards!: CardDashboard[];
  responsiveOptions: any[] | undefined;
  doacoes!: CardDoacoes[];
  visible: boolean = false;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _doacoesService: DoacoesService
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
    const classConfirmado = "status-confirmado";
    const classCancelado = "status-cancelado";

    if(status === "pendente"){
      return classPendente;
    } else if(status === "confirmado"){
      return classConfirmado;
    } else {
      return classCancelado;
    }
  }
}
