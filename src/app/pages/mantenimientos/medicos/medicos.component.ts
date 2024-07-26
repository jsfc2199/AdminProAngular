import { Component, inject } from '@angular/core';
import { MedicosService } from '../../../services/medicos.service';
import { Medicos } from '../../../models/medicos.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
})
export class MedicosComponent {
  private medicosService = inject(MedicosService);
  private modalService = inject(ModalImagenService);

  public modalSubscription = new Subscription();

  public cargando: boolean = true;
  public medicos: Medicos[] = [];

  ngOnInit(): void {    
    this.cargarMedicos()

    this.modalSubscription = this.modalService.nuevaImage
      .pipe(
        delay(100) //como la carga es muy rápida esperamos un poco para que el servidor que se pueda refrescar
      )
      .subscribe((img) => this.cargarMedicos());
  }

  cargarMedicos() {
    this.cargando = true;

    this.medicosService.cargarMedicos().subscribe((medicos) => {
      this.medicos = medicos
      this.cargando = false
    });
  }

  abrirModal(medico: Medicos){
    this.modalService.abrirModal('medicos', medico._id!, medico.img);
  }
}
