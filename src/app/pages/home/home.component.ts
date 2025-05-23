import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { LoginService } from '../../core/service/login.service';
import { UserLogin } from '../../core/interface/userLogin';
import { CardDashboard } from '../../core/interface/cardDashboard';
import { CardTurma } from '../../core/interface/cardTurma';
import { AlunoResponse } from '../../core/interface/alunoResponse';
import { AlunoService } from '../../core/service/aluno.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  userId!: string;
  userLogin!: UserLogin;
  cards!: CardDashboard[];
  responsiveOptions: any[] | undefined;
  turmas!: CardTurma[];
  alunos!: AlunoResponse[];
  visible: boolean = false;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _loginService: LoginService,
    private readonly _alunoService: AlunoService
  ) { }

  ngOnInit() {
    this.idUser();
    this.obterCardsDashboard();
    this.populandoCarrosel();
    this.populandoTurmas();
    this.obterAlunos();
  }

  idUser() {
    this.userId = this._route.snapshot.paramMap.get('id')!;
    const userIdInt = parseInt(this.userId);
    this.getUser(userIdInt);
  }

  getUser(id: number) {
    this._loginService.getUserId(id).subscribe({
      next: (responseUserLogin) => {
        this.userLogin = responseUserLogin;
        console.log(this.userLogin);
      }
    });
  }

  obterCardsDashboard() {
    this.cards = [
      { title: 'Total de Alunos', value: '5K', icon: 'pi-graduation-cap' },
      { title: 'Total de Turmas', value: '20', icon: 'pi-users' },
      { title: 'Alunos Aprovados', value: '3.5K', icon: 'pi-thumbs-up' },
      { title: 'Alunos Reprovados', value: '2K', icon: 'pi-thumbs-down' },
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

  populandoTurmas() {
    this.turmas = [
      {
        turma: 'Turma A',
        curso: 'ADS',
        semestre: '4 Semestre',
        horarioInicio: '09h00 AM',
        horarioFim: '12h00 AM',
        alunos: [
          { nome: 'João Silva' },
          { nome: 'Maria Oliveira' }
        ]
      },
      {
        turma: 'Turma B',
        curso: 'ADS',
        semestre: '4 Semestre',
        horarioInicio: '09h00 AM',
        horarioFim: '12h00 AM',
        alunos: [
          { nome: 'João Silva' },
          { nome: 'Maria Oliveira' }
        ]
      },
      {
        turma: 'Turma C',
        curso: 'ADS',
        semestre: '4 Semestre',
        horarioInicio: '09h00 AM',
        horarioFim: '12h00 AM',
        alunos: [
          { nome: 'João Silva' },
          { nome: 'Maria Oliveira' }
        ]
      },
      {
        turma: 'Turma D',
        curso: 'ADS',
        semestre: '4 Semestre',
        horarioInicio: '09h00 AM',
        horarioFim: '12h00 AM',
        alunos: [
          { nome: 'João Silva' },
          { nome: 'Maria Oliveira' }
        ]
      },
      {
        turma: 'Turma E',
        curso: 'ADS',
        semestre: '4 Semestre',
        horarioInicio: '09h00 AM',
        horarioFim: '12h00 AM',
        alunos: [
          { nome: 'João Silva' },
          { nome: 'Maria Oliveira' }
        ]
      },
      {
        turma: 'Turma E',
        curso: 'ADS',
        semestre: '4 Semestre',
        horarioInicio: '09h00 AM',
        horarioFim: '12h00 AM',
        alunos: [
          { nome: 'João Silva' },
          { nome: 'Maria Oliveira' }
        ]
      },
      {
        turma: 'Turma E',
        curso: 'ADS',
        semestre: '4 Semestre',
        horarioInicio: '09h00 AM',
        horarioFim: '12h00 AM',
        alunos: [
          { nome: 'João Silva' },
          { nome: 'Maria Oliveira' }
        ]
      },
      {
        turma: 'Turma E',
        curso: 'ADS',
        semestre: '4 Semestre',
        horarioInicio: '09h00 AM',
        horarioFim: '12h00 AM',
        alunos: [
          { nome: 'João Silva' },
          { nome: 'Maria Oliveira' }
        ]
      },
      {
        turma: 'Turma E',
        curso: 'ADS',
        semestre: '4 Semestre',
        horarioInicio: '09h00 AM',
        horarioFim: '12h00 AM',
        alunos: [
          { nome: 'João Silva' },
          { nome: 'Maria Oliveira' }
        ]
      },
      {
        turma: 'Turma E',
        curso: 'ADS',
        semestre: '4 Semestre',
        horarioInicio: '09h00 AM',
        horarioFim: '12h00 AM',
        alunos: [
          { nome: 'João Silva' },
          { nome: 'Maria Oliveira' }
        ]
      },
    ];

  }

  obterAlunos() {
    this._alunoService.getAlunos().subscribe((alunoResponse) => {
      console.log('alunos', alunoResponse);
      this.alunos = alunoResponse;
      console.log('alunos', this.alunos);
    })
  }

  onModalAlunos() {
    this.visible = true;
  }

  onModalProva() {
    this.visible = true;
  }

}
