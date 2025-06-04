import { Component } from '@angular/core';
import { UserDetails } from '../../core/interface/usuario';

@Component({
  selector: 'app-listagem-ong-empresa',
  standalone: false,
  templateUrl: './listagem-ong-empresa.component.html',
  styleUrl: './listagem-ong-empresa.component.scss'
})
export class ListagemOngEmpresaComponent {
  dataSource: UserDetails [] = [];


solicitarDoacao(arg0: any) {
throw new Error('Method not implemented.');
}

}
