import { Component } from '@angular/core';
import { UserDetails } from '../../core/interface/usuario';
import { UsuarioService } from '../../core/service/usuario.service';
import { LoginService } from '../../core/service/login.service';
import { UserLogin } from '../../core/interface/userLogin';


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
    private readonly _loginService: LoginService
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
    if(perfil === 1){
      return 'ONG';
    } else {
      return 'Doador'
    }
  }

  solicitarDoacao(arg0: any) {
    throw new Error('Method not implemented.');
  }

}
