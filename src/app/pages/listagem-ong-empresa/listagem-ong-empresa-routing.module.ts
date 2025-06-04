import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemOngEmpresaComponent } from './listagem-ong-empresa.component';

const routes: Routes = [
  {
    path: 'listagem-ong-empresa',
    component: ListagemOngEmpresaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListagemOngEmpresaRoutingModule { }
