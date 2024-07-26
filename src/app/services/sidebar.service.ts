import { Injectable } from '@angular/core';
import { Menu } from '../interface/menu.interface';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public menu = []

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu') || '') || [];
  }
  
  // menu: Menu[] = [
  //   {
  //     titulo: 'Dashboard!!!',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Main', url: '/' },
  //       { titulo: 'ProgressBar', url: 'progress' },
  //       { titulo: 'Gráficas', url: 'grafica1' },
  //       { titulo: 'Promesas', url: 'promesas' },
  //       { titulo: 'RxJs', url: 'rxjs' },
  //     ],
  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: 'usuarios' },
  //       { titulo: 'Hospitales', url: 'hospitales' },
  //       { titulo: 'Medicos', url: 'medicos' },

  //     ],
  //   },
  // ];

  constructor() {}
}
