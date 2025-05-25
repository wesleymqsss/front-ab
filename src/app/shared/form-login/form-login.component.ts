import { Component } from '@angular/core';
import { LoginService } from '../../core/service/login.service';
import { Logged, Login, UserLogin } from '../../core/interface/userLogin';
import { SnackbarService } from '../../core/service/snackbar.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-login',
  standalone: false,
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss'
})
export class FormLoginComponent {
  userLogged!: Logged;
  
  constructor(
    private readonly _userLoginService: LoginService,
    private readonly _snackbarService: SnackbarService,
    private readonly _router: Router
  ) { }

  password: string = '';

  email: string = '';

  accept: boolean = false;

  loading: boolean = false;

  load() {
    this.loading = true;

    if (this.accept !== false) {
      this.getUserLogin();
    } else {
      console.log('sou o termo de falso', this.accept);
      this._snackbarService.showWarn('Favor, aceitar termos de uso!');
      this.loading = false
    }
  }

  getUserLogin() {
    console.log('tentado logar com email', this.email);
    this.loading = true;

    const credentials : Login = {
      email: this.email,
      senha: this.password
    }

    this._userLoginService.getUserLogin(credentials).subscribe({
      next: (responseUserLogin) => {
        this.userLogged = responseUserLogin;
        this.redirect(this.userLogged.id);
        this.loading = false;
      }, error: (err) => {
        console.error('error login' , err);
        this._snackbarService.showError('Usuário não encontrado. Favor, verificar dados de login!');
        this.loading = false;
      }
    })
  }

  redirect(id: string) {
    this._router.navigate(['/home', id]);
  }
}
