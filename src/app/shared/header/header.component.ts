import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { User } from '../../models/users.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private usuarioService: UsuarioService = inject(UsuarioService);
  public usuario!: User;
  private router: Router = inject(Router);

  constructor() {
    this.usuario = this.usuarioService.usuario!;
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.router.navigateByUrl(`/dashboard`);
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }
}
