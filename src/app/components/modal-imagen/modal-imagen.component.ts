import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrl: './modal-imagen.component.css'
})
export class ModalImagenComponent {
  public ocultarModal = false;

  cerrarModal(){
    this.ocultarModal = true
  }
}
