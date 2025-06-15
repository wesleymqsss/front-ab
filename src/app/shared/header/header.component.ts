import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Drawer } from 'primeng/drawer';
import { LoginService } from '../../core/service/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../core/service/snackbar.service';
import { confirmarSenharIguais } from '../../validators/passwordValidators';
import { UserDetails } from '../../core/interface/usuario';
import { UsuarioService } from '../../core/service/usuario.service';
import { HistoricoRejeicaoService } from '../../core/service/historico-rejeicao.service';
import { HistoricoRejeicaoItem, SolicitacaoBeneficiadoItem, SolicitacaoDoacaoHistorico } from '../../core/interface/historicoRejeicao';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() userId: string = "";
  historicoRejeicaoParaTabela: HistoricoRejeicaoItem[] = [];
  historicoParaBeneficiado: SolicitacaoBeneficiadoItem[] = [];
  userDetails!: UserDetails;
  newUserLogin!: any
  items: MenuItem[] | undefined;
  visible: boolean = false;
  visibleEditPassword: boolean = false;
  visibleEditProfile: boolean = false;
  visibleTableHistorico: boolean = false;
  formUpdatePassword!: FormGroup;
  formUpdateUser!: FormGroup;
  @ViewChild('drawerRef') drawerRef!: Drawer;

  constructor(
    private _fb: FormBuilder,
    private _loginService: LoginService,
    private _usuarioService: UsuarioService,
    private _snackbarService: SnackbarService,
    private _historicoRejeicaoService: HistoricoRejeicaoService
  ) {
  }

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  ngOnInit() {
    this.formUpdateUser = this._fb.group(
      {
        email: [null, [Validators.required, Validators.email]],
        nome: [null, [Validators.required, Validators.required]],
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
      }
    );

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
        label: 'Ver comunidade',
        icon: 'pi pi pi-users',
        routerLink: ['/listagem-ong-empresa']
      },
      {
        label: 'Histórico de rejeições',
        icon: 'pi pi pi-users',
        command: () => this.showDialogTableHistorico()
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

  getHistoricoRejeicoes(tipoPerfil: number | null) {
    if (tipoPerfil === 1) {
      this._historicoRejeicaoService.getHistoricoRejeicaoSolicitante(this.userId).subscribe({
        next: (historicoRejeicaoResponse: SolicitacaoDoacaoHistorico[]) => {
          this.historicoRejeicaoParaTabela = historicoRejeicaoResponse.map(item => ({
            tipoSolicitacao: item.tipoSolicitacao,
            dataRejeicao: item.dataRejeicao,
            dataSolicitacao: item.dataSolicitacao,
            email: item.usuario.email,
            nome: item.usuario.nome,
            cidade: item.usuario.cidade,
            estado: item.usuario.estado
          }));

          console.log('Historico: ', this.historicoRejeicaoParaTabela);
        }
      })
    } else {
      this._historicoRejeicaoService.getHistoricoRejeicaoBeneficiado(this.userId).subscribe({
        next: (historicoRejeicaoResponse: SolicitacaoDoacaoHistorico[]) => {
          this.historicoParaBeneficiado  = historicoRejeicaoResponse.map(item => ({
            solicitante: item.solicitante,
            tipoSolicitacao: item.tipoSolicitacao,
            dataSolicitacao: item.dataSolicitacao,
            dataRejeicao: item.dataRejeicao
          }));

          console.log('Historico: ', this.historicoRejeicaoParaTabela);
        }
      });
    }
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
        this.loadValueForm(this.userDetails);
        this.getHistoricoRejeicoes(this.userDetails.tipoPerfil);
      }
    });
  }

  loadValueForm(userDetails: UserDetails) {
    if (userDetails) {
      this.formUpdateUser.patchValue({
        email: userDetails.email,
        nome: userDetails.nome,
        tipoPerfil: this.profileType(userDetails.tipoPerfil),
        cpfCnpj: userDetails.cpfCnpj,
        cep: userDetails.cep,
        telefone: userDetails.telefone,
        cidade: userDetails.cidade,
        tipoDoacao: userDetails.tipoDoacao,
        bairro: userDetails.bairro,
        numero: userDetails.numero,
        referenciaEndereco: userDetails.referenciaEndereco,
        estado: userDetails.estado,
        sobreNos: userDetails.sobreNos
      });
    } else {
      console.warn('UserDetails ainda não disponível para popular o formulário.');
    }
  }

  submitUpdatePassword() {
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
        this._snackbarService.showSuccess("Senha, atualizada com sucesso!!!");
        this.visibleEditPassword = false;
        console.log(updateUser)
        this.formUpdatePassword.reset();
      }, error: (err) => {
        this._snackbarService.showContrast("Error ao alterar senha.");
        console.log(updateUser)
        this.visibleEditPassword = false;
      }
    })
  }

  submitUpdateUserDetails() {
    if (this.formUpdateUser.invalid) {
      this._snackbarService.showContrast("Favor, verificar se todos os campos estão preenchidos corretamente.");
      return;
    }

    const formValue = this.formUpdateUser.value;
    let transformNumber = Number(formValue.numero);

    const updateUserDetails = {
      email: formValue.email,
      nome: formValue.nome,
      tipoPerfil: this.userDetails.tipoPerfil,
      cpfCnpj: formValue.cpfCnpj,
      cep: formValue.cep,
      telefone: formValue.telefone,
      cidade: formValue.cidade,
      tipoDoacao: formValue.tipoDoacao,
      bairro: formValue.bairro,
      numero: transformNumber,
      referenciaEndereco: formValue.referenciaEndereco,
      estado: formValue.estado,
      sobreNos: formValue.sobreNos
    }

    console.log("Objeto para requisição:", updateUserDetails);

    this._usuarioService.userDetailsUpdate(this.userDetails.id, updateUserDetails).subscribe({
      next: (data) => {
        this._snackbarService.showSuccess("Dados atualizados com sucesso!!!");
        this.visibleEditProfile = false;
        console.log(updateUserDetails)

      }, error: (err) => {
        this._snackbarService.showContrast("Error ao alterar senha.");
        console.log(updateUserDetails)
      }
    })
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
    this.visibleEditProfile = false
  }

  isStep1Valid(): boolean {
    const step1Controls = ['nome', 'email', 'cpfCnpj', 'telefone'];
    return step1Controls.every(controlName => this.formUpdateUser.get(controlName)?.valid ?? false);
  }

  isStep2Valid(): boolean {
    const step2Controls = ['cep', 'estado', 'cidade', 'bairro', 'numero', 'referenciaEndereco'];
    return step2Controls.every(controlName => this.formUpdateUser.get(controlName)?.valid ?? false);
  }

  profileType(profile: number | null) {
    if (profile === 1) {
      return "ONG";
    } else {
      return "Doador";
    }
  }

  onCepBlur() {
    throw new Error('Method not implemented.');
  }

  showDialogTableHistorico() {
    this.visibleTableHistorico = true
  }

}
