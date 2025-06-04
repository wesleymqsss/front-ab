import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ListagemOngEmpresaComponent } from './pages/listagem-ong-empresa/listagem-ong-empresa.component';

const routes: Routes = [
  {
    path: 'home/:id',
    component: HomeComponent
  },
   {
    path: 'listagem-ong-empresa',
    component: ListagemOngEmpresaComponent
  },
  {
    path: '',
    component: LoginComponent

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
