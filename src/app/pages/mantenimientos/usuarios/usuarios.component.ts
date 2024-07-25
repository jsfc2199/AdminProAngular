import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { User } from '../../../models/users.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { debounceTime, Subject, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent {
  private usuarioService: UsuarioService = inject(UsuarioService);
  private busquedaService: BusquedasService = inject(BusquedasService);
  private modalService:ModalImagenService = inject(ModalImagenService)  
  private searchTerms = new Subject<string>();

  public totalUsuarios: number = 0;
  public usuarios: User[] = [];
  public usuariosTemp: User[] = [];

  public desde: number = 0;
  public loading: boolean = false

  ngOnInit(): void {
    this.cargarUsuarios();

    this.searchTerms.pipe(
      debounceTime(300),
      switchMap((termino: string) => this.busquedaService.buscar('usuarios',termino))
    ).subscribe(resp => {
      this.usuarios = resp
    })
  }

  cargarUsuarios() {
    this.loading = true
    this.usuarioService
      .cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;

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

  search(termino: string){  
    if(termino.length === 0) {
      this.usuarios = this.usuariosTemp
      return
    }  
    this.searchTerms.next(termino)   
  }

  deleteUser(usuario: User){
    if(usuario.uuid === this.usuarioService.uuid){
      Swal.fire('Error', 'Can not delete yourself')
      return 
    }
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this! User to delete ${usuario.nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
        .subscribe(resp => {
          Swal.fire({
            title: "Deleted!",
            text: "User has been deleted.",
            icon: "success"
          });
          this.cargarUsuarios()
        })
       
      }
    });
    
  }

  cambiarRole(usuario: User){
    this.usuarioService.guardarUsuario(usuario)
    .subscribe(resp => console.log(resp))
  }

  abrirModal(usuario: User){
    this.modalService.abrirModal('usuarios',usuario.uuid!, usuario.img)
  }
}
