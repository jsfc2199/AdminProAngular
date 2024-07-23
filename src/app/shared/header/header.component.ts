import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { User } from '../../models/users.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private usuarioService: UsuarioService = inject(UsuarioService)
  public usuario!: User

  constructor(){
    this.usuario = this.usuarioService.usuario!
  }

  logout(){
    this.usuarioService.logout()
  }

}
