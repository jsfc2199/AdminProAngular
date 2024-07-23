import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private usuarioService: UsuarioService = inject(UsuarioService)


  logout(){
    this.usuarioService.logout()
  }

}
