import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../guards/admin.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'} },
  { path: 'progress',  component: ProgressComponent, data: {titulo: 'progress'}  },
  { path: 'grafica1',  component: Grafica1Component  ,data: {titulo: 'gráfica 1'}},
  { path: 'account-settings',  component: AccountSettingsComponent,data: {titulo: 'account settings'}  },
  { path: 'promesas',  component: PromesasComponent ,data: {titulo: 'Promesas'} },
  { path: 'rxjs',  component: RxjsComponent,data: {titulo: 'RxJs'}  },
  { path: 'profile',  component: ProfileComponent, data: {titulo: 'Profile'}  },

  { path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [adminGuard],
    data: {titulo: 'Usuarios de aplicación'}
    },


  { path: 'hospitales',  component: HospitalesComponent, data: {titulo: 'Hospitales de aplicación'}  },
  { path: 'medicos',  component: MedicosComponent, data: {titulo: 'Medicos de aplicación'}  },
  { path: 'medico/:id',  component: MedicoComponent, data: {titulo: 'Medico de aplicación'}  },
  { path: 'buscar/:term',  component: BusquedasComponent, data: {titulo: 'Búsquedas'}  },
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule { }
