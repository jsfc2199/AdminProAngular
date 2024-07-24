import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { User } from '../../models/users.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

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
  public imgTemp: string | ArrayBuffer | null = ''
  imagenValida = false;
  errorMessage: string | null = null;

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
    .subscribe({
      next: res => {
        const {nombre, email} = this.profileForm.value
        this.usuario.nombre = nombre
        this.usuario.email = email

        Swal.fire('Saved','Changes saved', 'success')
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      }
    })


  }

  cambiarImagen(event: any){
    const file: File = event.target.files[0]
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

    if(!file){
      this.imgTemp = null
      return
    }

    if(allowedTypes.includes(file.type)){
      this.imagenSubir = file
      this.errorMessage = null;
      this.imagenValida = true;

      const reader = new FileReader()

      reader.onloadend = () => {
        this.imgTemp = reader.result
      }
      reader.readAsDataURL(file);
    }else{
      this.errorMessage = 'El archivo debe ser una imagen de tipo PNG, JPG, JPEG o GIF.';
      this.imagenValida = false;
    }
  }

  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uuid!)
    .then(img => {
      this.usuario.img = img
      Swal.fire('Saved','Picture saved', 'success')
    }).catch(err => {
      Swal.fire('Error', 'Picture can not be uploaded', 'error')
    })
  }

}
