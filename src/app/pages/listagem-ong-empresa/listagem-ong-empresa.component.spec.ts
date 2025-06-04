import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemOngEmpresaComponent } from './listagem-ong-empresa.component';

describe('ListagemOngEmpresaComponent', () => {
  let component: ListagemOngEmpresaComponent;
  let fixture: ComponentFixture<ListagemOngEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListagemOngEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemOngEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
