import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficaComponent } from './grafica/grafica.component';
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
import { AdministradoComponent } from './administrado/administrado.component';

const routes: Routes = [
  {
    path:'admin',
    component:AdminComponent,
    children:[
      {path:'',component:DashboardComponent},
      {path:'grafica',component:GraficaComponent},
      {path:'administrado', component:AdministradoComponent},
      {path:'alerta', component:AlertaComponent},
      {path:'alertaderivada', component:AlertaDerivadaComponent},
      {path:'area', component:AreaComponent},
      {path:'dni', component:DniComponent},
      {path:'estado', component:EstadoComponent},
      {path:'organo', component:OrganoComponent},
      {path:'rol', component:RolComponent},
      {path:'sede', component:SedeComponent},
      {path:'tipoalerta', component:TipoAlertaComponent},
      {path:'unidadorganica', component:UnidadOrganicaComponent},
      {path:'usuario', component:UsuarioComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
