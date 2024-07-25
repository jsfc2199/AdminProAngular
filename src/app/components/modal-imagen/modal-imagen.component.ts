import { Component, inject } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrl: './modal-imagen.component.css'
})
export class ModalImagenComponent {

  public modalService = inject(ModalImagenService)
  private fileUploadService = inject(FileUploadService)

  public imgTemp: string | ArrayBuffer | null = ''
  public imagenSubir!: File
  imagenValida = false;
  errorMessage: string | null = null;
  
  cerrarModal(){
    this.imgTemp = null
    this.modalService.cerrarModal()
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
    const  id  = this.modalService.id
    const  tipo  = this.modalService.tipo

    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
    .then(img => {
      Swal.fire('Saved','Picture saved', 'success');
      this.modalService.nuevaImage.emit(img) //emitimos la imagen para capturarla desde el usuarios component
      this.cerrarModal()
    }).catch(err => {
      Swal.fire('Error', 'Picture can not be uploaded', 'error')
    })
  }
}
