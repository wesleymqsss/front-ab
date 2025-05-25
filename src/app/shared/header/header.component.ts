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
  visibleEditProfile: boolean = false;
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
    // this.formUpdateUser = this._fb.group(
    //   {
    //     username: [this.newUserLogin.username, Validators.required],
    //     password: ['', Validators.required],
    //     confirmpassword: ['', Validators.required],
    //   },
    //   {
    //     validators: confirmarSenharIguais('password', 'confirmpassword')
    //   }
    // );

    // this.items = [
    //   {
    //     label: 'Home',
    //     icon: 'pi pi-home',
    //     routerLink: ['/home/' + this.newUserLogin.id]
    //   },
    //   {
    //     label: 'Contact',
    //     icon: 'pi pi-envelope'
    //   },
    //   {
    //     label: 'Perfil',
    //     icon: 'pi pi-search',
    //     items: [
    //       {
    //         label: 'Blocks',
    //         icon: 'pi pi-server'
    //       },
    //       {
    //         label: 'Atualizar Perfil',
    //         icon: 'pi pi-user-edit',
    //         command: () => this.showDialog()
    //       },
    //       {
    //         label: 'Sair',
    //         icon: 'pi pi-sign-out',
    //         routerLink: ['/']

    //       },
    //     ]
    //   },
    // ]
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId'] && changes['userId'].currentValue) {
      this.newUserLogin = (changes['userLogin'].currentValue);
      this.getUserDetails(this.userId);
    }
  }

  showDialog() {
    this.visibleEditProfile = true;
  }

  getUserDetails(userId: string) {
   this._usuarioService.getUserDetails(userId).subscribe({
    next: (responseUserDetails) => {
      this.userDetails = responseUserDetails;
      console.log(this.userDetails)
    }
   })
  }

  submitUpdate() {
    const idUser = this.newUserLogin.id;
    const role = this.newUserLogin.role;

    if (this.formUpdateUser.invalid) {
      this._snackbarService.showContrast("Favor, verificar se todos os campos estão preenchidos corretamente.");
      this.formUpdateUser.markAllAsTouched();
      return;
    }

    const updateUser = {
      id: idUser,
      username: this.formUpdateUser.get('username')?.value,
      password: this.formUpdateUser.get('password')?.value,
      role: role
    }

    this._loginService.updateUser(idUser, updateUser).subscribe({
      next: (data) => {
        this._snackbarService.showSuccess("Usuário atualizado com sucesso!!!");
        this.visibleEditProfile = false;
        console.log(updateUser)
        this.formUpdateUser.reset();
      }, error: (err) => {
        if (err.status === 200) {
          this._snackbarService.showSuccess("Usuário atualizado com sucesso!!!");
          this.visibleEditProfile = false;
          console.log(updateUser)
          this.formUpdateUser.reset();
        } else {
          this._snackbarService.showContrast("Error ao salvar alterações.")
        }
      }
    })
  }

  closeModal() {
    this.visibleEditProfile = false
    this.formUpdateUser.get('password')?.reset();
    this.formUpdateUser.get('confirmpassword')?.reset();
  }

}
