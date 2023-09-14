import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficaComponent } from './grafica/grafica.component';
import { SharedModule } from '../shared/shared.module';
import { AdministradoComponent } from './administrado/administrado.component';
import { AlertaComponent } from './alerta/alerta.component';
import { AlertaDerivadaComponent } from './alerta-derivada/alerta-derivada.component';
import { AreaComponent } from './area/area.component';
import { DniComponent } from './dni/dni.component';
import { EstadoComponent } from './estado/estado.component';
import { OrganoComponent } from './organo/organo.component';
import { RolComponent } from './rol/rol.component';
import { SedeComponent } from './sede/sede.component';
import { TipoAlertaComponent } from './tipo-alerta/tipo-alerta.component';
import { UnidadOrganicaComponent } from './unidad-organica/unidad-organica.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    GraficaComponent,
    AdministradoComponent,
    AlertaComponent,
    AlertaDerivadaComponent,
    AreaComponent,
    DniComponent,
    EstadoComponent,
    OrganoComponent,
    RolComponent,
    SedeComponent,
    TipoAlertaComponent,
    UnidadOrganicaComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }
