import { Component, inject } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrl: './modal-imagen.component.css'
})
export class ModalImagenComponent {

  public modalService = inject(ModalImagenService)

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
}
