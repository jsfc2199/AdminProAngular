import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { User } from '../../models/users.model';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {

  private fb: FormBuilder = inject(FormBuilder)
  private usuarioService: UsuarioService = inject(UsuarioService)
  private fileUploadService: FileUploadService = inject(FileUploadService)

  public usuario: User
  public imagenSubir!: File

  constructor(){
    this.usuario = this.usuarioService.usuario! //modificamos el usuario service directamente (la referencia) para modificar en todos los lugares nombre e email
  }

  profileForm!: FormGroup
  ngOnInit(): void {

    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required]],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    })
  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.profileForm.value)
    .subscribe(res=> {
      const {nombre, email} = this.profileForm.value
      this.usuario.nombre = nombre
      this.usuario.email = email
    })

  }

  cambiarImagen(event: any){
    const file: File = event.target.files[0]

    this.imagenSubir = file
  }

  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uuid!)
    .then(resp => {
      console.log(resp)
    })
  }

}
