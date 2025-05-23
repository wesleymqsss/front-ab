import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../core/material/material.module";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "../pipes/pipes.module";
import { BrowserModule } from "@angular/platform-browser";
import { DirectivesModule } from "../directive/directives.module";
import { FormLoginComponent } from './form-login/form-login.component';
import { FormLoginLeftComponent } from './form-login-left/form-login-left.component';
import { HeaderComponent } from './header/header.component';
import { CardDashboardComponent } from "./card-dashboard/card-dashboard.component";
import { Grafico2Component } from "./grafico-2/grafico-2.component";
import { Grafico1Component } from "./grafico-1/grafico-1.component";

@NgModule({
    declarations: [
        FormLoginComponent,
        FormLoginLeftComponent,
        HeaderComponent,
        CardDashboardComponent,
        Grafico2Component,
        Grafico1Component
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FormsModule,
        BrowserModule,
        PipesModule,
        DirectivesModule,
        ReactiveFormsModule,
        
    ],
    exports: [
        FormsModule,
        FormLoginComponent,
        FormLoginLeftComponent,
        HeaderComponent,
        CardDashboardComponent,
        Grafico2Component,
        Grafico1Component
    ]
})
export class SharedModule { }