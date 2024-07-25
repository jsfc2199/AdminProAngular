import { Component, inject } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrl: './modal-imagen.component.css'
})
export class ModalImagenComponent {

  public modalService = inject(ModalImagenService)
  
  cerrarModal(){
    this.modalService.cerrarModal()
  }
}
