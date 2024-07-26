import { Component, inject } from '@angular/core';
import { MedicosService } from '../../../services/medicos.service';
import { Medicos } from '../../../models/medicos.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { debounceTime, delay, Subject, Subscription, switchMap } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
})
export class MedicosComponent {
  private medicosService = inject(MedicosService);
  private modalService = inject(ModalImagenService);
  private busquedaService = inject(BusquedasService);

  public modalSubscription = new Subscription();
  public medicosTemp: Medicos[] = [];

  public searchTerm = new Subject<string>();

  public cargando: boolean = true;
  public medicos: Medicos[] = [];

  ngOnInit(): void {    
    this.cargarMedicos()

    this.searchTerm
      .pipe(
        debounceTime(300),
        switchMap((term: string) =>
          this.busquedaService.buscar('Medicos', term)
        )
      )
      .subscribe((hospitales) => {
        this.medicos = hospitales;
      });

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
      this.medicosTemp = medicos
    });
  }

  abrirModal(medico: Medicos){
    this.modalService.abrirModal('medicos', medico._id!, medico.img);
  }

  searchMedic(term: string){
    if (term.length === 0) {
      this.medicos = this.medicosTemp;
      return;
    }
    this.searchTerm.next(term);
  }
}
