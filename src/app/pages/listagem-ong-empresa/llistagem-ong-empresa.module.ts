import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../core/material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ListagemOngEmpresaComponent } from './listagem-ong-empresa.component';
import { ListagemOngEmpresaRoutingModule } from './listagem-ong-empresa-routing.module';

@NgModule({
  declarations: [
    ListagemOngEmpresaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ListagemOngEmpresaRoutingModule,
    PipesModule 
  ],
  exports: [
    ListagemOngEmpresaComponent
  ]
})

export class ListagemOngEmpresaModule { }
