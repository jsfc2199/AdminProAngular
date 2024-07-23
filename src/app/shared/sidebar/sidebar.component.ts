import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Menu } from '../../interface/menu.interface';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  private sidebarService = inject(SidebarService)
  private usuarioService: UsuarioService = inject(UsuarioService)

  menuItems: Menu[]= []

   constructor(){
    this.menuItems = this.sidebarService.menu
   }

   logout(){
    this.usuarioService.logout()
   }
}
