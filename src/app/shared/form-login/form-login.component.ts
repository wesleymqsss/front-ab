import { Component } from '@angular/core';
import { LoginService } from '../../core/service/login.service';
import { Logged, Login } from '../../core/interface/userLogin';
import { SnackbarService } from '../../core/service/snackbar.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { confirmarSenharIguais } from '../../validators/passwordValidators';
import { UsuarioService } from '../../core/service/usuario.service';

interface Iselect {
  name: string;
  code: number
}

interface IselectCodeString {
  name: string;
  code: string
}

@Component({
  selector: 'app-form-login',
  standalone: false,
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss'
})

export class FormLoginComponent {
  tiposPerfil: Iselect[] | undefined;
  estados: IselectCodeString [] | undefined;
  userLogged!: Logged;
  formUser!: FormGroup;
  password: string = '';
  email: string = '';
  accept: boolean = false;
  loading: boolean = false;
  visibleEditProfile: boolean = false;

  constructor(
    private readonly _userLoginService: LoginService,
    private readonly _usuarioService: UsuarioService,
    private readonly _snackbarService: SnackbarService,
    private readonly _router: Router,
    private readonly _fb: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.tiposPerfil = [
      { name: 'ONG', code: 1 },
      { name: 'DOADOR', code: 2 },

    ];

    this.estados = [
      { name: 'Acre', code: 'AC' },
      { name: 'Alagoas', code: 'AL' },
      { name: 'Amapá', code: 'AP' },
      { name: 'Amazonas', code: 'AM' },
      { name: 'Bahia', code: 'BA' },
      { name: 'Ceará', code: 'CE' },
      { name: 'Distrito Federal', code: 'DF' },
      { name: 'Espírito Santo', code: 'ES' },
      { name: 'Goiás', code: 'GO' },
      { name: 'Maranhão', code: 'MA' },
      { name: 'Mato Grosso', code: 'MT' },
      { name: 'Mato Grosso do Sul', code: 'MS' },
      { name: 'Minas Gerais', code: 'MG' },
      { name: 'Pará', code: 'PA' },
      { name: 'Paraíba', code: 'PB' },
      { name: 'Paraná', code: 'PR' },
      { name: 'Pernambuco', code: 'PE' },
      { name: 'Piauí', code: 'PI' },
      { name: 'Rio de Janeiro', code: 'RJ' },
      { name: 'Rio Grande do Norte', code: 'RN' },
      { name: 'Rio Grande do Sul', code: 'RS' },
      { name: 'Rondônia', code: 'RO' },
      { name: 'Roraima', code: 'RR' },
      { name: 'Santa Catarina', code: 'SC' },
      { name: 'São Paulo', code: 'SP' },
      { name: 'Sergipe', code: 'SE' },
      { name: 'Tocantins', code: 'TO' }
    ];


    this.formUser = this._fb.group(
      {
        email: [null, [Validators.required, Validators.email]],
        nome: [null, [Validators.required, Validators.required]],
        senha: [null, [Validators.required, Validators.required]],
        tipoPerfil: [null, [Validators.required, Validators.required]],
        cpfCnpj: [null, [Validators.required, Validators.required]],
        cep: [null, [Validators.required, Validators.required]],
        telefone: [null, [Validators.required, Validators.required]],
        cidade: [null, [Validators.required, Validators.required]],
        tipoDoacao: [null, [Validators.required, Validators.required]],
        bairro: [null, [Validators.required, Validators.required]],
        numero: [null, [Validators.required, Validators.required]],
        referenciaEndereco: [null, [Validators.required, Validators.required]],
        estado: [null, [Validators.required, Validators.required]],
        sobreNos: [null, [Validators.required, Validators.required]],
        confirmPassword: ['', Validators.required],
      }
      ,
      {
        validators: confirmarSenharIguais('senha', 'confirmPassword')
      }
    );
  }

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

    const credentials: Login = {
      email: this.email,
      senha: this.password
    }

    this._userLoginService.getUserLogin(credentials).subscribe({
      next: (responseUserLogin) => {
        this.userLogged = responseUserLogin;
        this.redirect(this.userLogged.id);
        this.loading = false;
      }, error: (err) => {
        console.error('error login', err);
        this._snackbarService.showError('Usuário não encontrado. Favor, verificar dados de login!');
        this.loading = false;
      }
    })
  }

  openModal() {
    this.visibleEditProfile = true;
  }

  closeModal() {
    this.visibleEditProfile = false
  }

  redirect(id: string) {
    this._router.navigate(['/home', id]);
  }

  isStep1Valid(): boolean {
    const step1Controls = ['nome', 'email', 'cpfCnpj', 'telefone'];
    return step1Controls.every(controlName => this.formUser.get(controlName)?.valid ?? false);
  }

  isStep2Valid(): boolean {
    const step2Controls = ['cep', 'estado', 'cidade', 'bairro', 'numero', 'referenciaEndereco'];
    return step2Controls.every(controlName => this.formUser.get(controlName)?.valid ?? false);
  }

  submitUserDetails() {
    const formValue = this.formUser.value
    if (formValue) {
      this._usuarioService.createUser(formValue).subscribe({
        next: (data) => {
          this._snackbarService.showSuccess("Usuário criado com sucesso.");
          this.formUser.reset();
          this.closeModal();
        }, error: (err) => {
          this._snackbarService.showError(err);
        }
      })
    } else {
      console.log(formValue);
      this._snackbarService.showWarn("Favor, verificar dados do formulario.");

    }

  }
}
