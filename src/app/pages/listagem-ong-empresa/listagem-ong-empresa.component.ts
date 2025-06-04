import { Component } from '@angular/core';
import { UserDetails } from '../../core/interface/usuario';
import { UsuarioService } from '../../core/service/usuario.service';

@Component({
  selector: 'app-listagem-ong-empresa',
  standalone: false,
  templateUrl: './listagem-ong-empresa.component.html',
  styleUrl: './listagem-ong-empresa.component.scss'
})
export class ListagemOngEmpresaComponent {
  dataSource: UserDetails[] = [];

  constructor(
    private readonly _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.getDataSource();
  }

  getDataSource(){
    this._usuarioService.getUserForProfile(1).subscribe({
      next: (dataSourceResponse) => {
        this.dataSource = dataSourceResponse;
        console.log(this.dataSource)
      }
    });
  }

  solicitarDoacao(arg0: any) {
    throw new Error('Method not implemented.');
  }

}
