import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { User } from '../../../models/users.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent {
  private usuarioService: UsuarioService = inject(UsuarioService);

  public totalUsuarios: number = 0;
  public usuarios: User[] = [];
  public desde: number = 0;
  public loading: boolean = false

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.loading = true
    this.usuarioService
      .cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.usuarios = usuarios;
        this.totalUsuarios = total;
        this.loading = false
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }
}
