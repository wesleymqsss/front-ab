import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Drawer } from 'primeng/drawer';
import { LoginService } from '../../core/service/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../core/service/snackbar.service';
import { confirmarSenharIguais } from '../../validators/passwordValidators';
import { UserDetails } from '../../core/interface/usuario';
import { UsuarioService } from '../../core/service/usuario.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() userId: string = "";
  userDetails!: UserDetails;
  newUserLogin!: any
  items: MenuItem[] | undefined;
  visible: boolean = false;
  visibleEditPassword: boolean = false;
  visibleEditProfile: boolean = false;
  formUpdatePassword!: FormGroup;
  formUpdateUser!: FormGroup;
  @ViewChild('drawerRef') drawerRef!: Drawer;

  constructor(
    private _fb: FormBuilder,
    private _loginService: LoginService,
    private _usuarioService: UsuarioService,
    private _snackbarService: SnackbarService) {
  }

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  ngOnInit() {
    this.formUpdatePassword = this._fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: confirmarSenharIguais('newPassword', 'confirmPassword')
      }
    );

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/home/' + this.userId]
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope'
      },
      {
        label: 'Perfil',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Atualizar perfil',
            icon: 'pi pi-server',
            command: () => this.showDialogProfile()
          },
          {
            label: 'Alterar senha',
            icon: 'pi pi-user-edit',
            command: () => this.showDialogPassword()
          },
          {
            label: 'Sair',
            icon: 'pi pi-sign-out',
            routerLink: ['/']

          },
        ]
      },
    ]
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId'] && changes['userId'].currentValue) {
      this.getUserDetails(this.userId);
    }
  }


  getUserDetails(userId: string) {
    this._usuarioService.getUserDetails(userId).subscribe({
      next: (responseUserDetails) => {
        this.userDetails = responseUserDetails;
      }
    });
  }

  submitUpdate() {

    if (this.formUpdatePassword.invalid) {
      this._snackbarService.showContrast("Favor, verificar se todos os campos estão preenchidos corretamente.");
      this.formUpdatePassword.markAllAsTouched();
      return;
    }

    const updateUser = {
      email: this.userDetails.email,
      currentPassword: this.formUpdatePassword.get('currentPassword')?.value,
      newPassword: this.formUpdatePassword.get('newPassword')?.value,
    }

    this._loginService.updatePassword(updateUser).subscribe({
      next: (data) => {
        this._snackbarService.showSuccess("Usuário atualizado com sucesso!!!");
        this.visibleEditPassword = false;
        console.log(updateUser)
        this.formUpdatePassword.reset();
      }, error: (err) => {
        this._snackbarService.showContrast("Error ao alterar senha.");
        console.log(updateUser)
      }
    })
  }

  profileType(profile: number) {
    if (profile === 1) {
      return "ONG";
    } else {
      return "Doador";
    }
  }
  showDialogPassword() {
    this.visibleEditPassword = true;
  }

  closeModalPassword() {
    this.visibleEditPassword = false
    this.formUpdatePassword.get('password')?.reset();
    this.formUpdatePassword.get('confirmpassword')?.reset();
  }

  showDialogProfile() {
    this.visibleEditProfile = true;
  }

  closeModalProfile() {
    this.visibleEditPassword = false
  }

}
