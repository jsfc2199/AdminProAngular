import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Menu } from '../../interface/menu.interface';
import { UsuarioService } from '../../services/usuario.service';
import { User } from '../../models/users.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  public sidebarService = inject(SidebarService)
  private usuarioService: UsuarioService = inject(UsuarioService)
  private router: Router = inject(Router)
  public usuario!: User

  menuItems: Menu[]= []

   constructor(){
    // this.menuItems = this.sidebarService.menu
    this.usuario = this.usuarioService.usuario!
   }

   logout(){
    this.usuarioService.logout()
    this.router.navigateByUrl('/login')
   }
}
