import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { authGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';

const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,
    canActivate: [ authGuard ],
    children: [
      { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'} },
      { path: 'progress',  component: ProgressComponent, data: {titulo: 'progress'}  },
      { path: 'grafica1',  component: Grafica1Component  ,data: {titulo: 'gráfica 1'}},
      { path: 'account-settings',  component: AccountSettingsComponent,data: {titulo: 'account settings'}  },
      { path: 'promesas',  component: PromesasComponent ,data: {titulo: 'Promesas'} },
      { path: 'rxjs',  component: RxjsComponent,data: {titulo: 'RxJs'}  },
      { path: 'profile',  component: ProfileComponent, data: {titulo: 'Profile'}  },
      { path: 'usuarios',  component: UsuariosComponent, data: {titulo: 'Usuarios de aplicación'}  },
      { path: 'hospitales',  component: HospitalesComponent, data: {titulo: 'Hospitales de aplicación'}  },
      { path: 'medicos',  component: MedicosComponent, data: {titulo: 'Medicos de aplicación'}  },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
