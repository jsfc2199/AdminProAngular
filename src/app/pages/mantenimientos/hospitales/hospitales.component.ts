import { Component, inject } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { debounceTime, delay, Subject, Subscription, switchMap } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
})
export class HospitalesComponent {
  private hospitalService = inject(HospitalService);
  private modalService = inject(ModalImagenService);
  private busquedaService = inject(BusquedasService);

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public cargarHospitalesSubscription = new Subscription();
  public modalSubscription = new Subscription();
  public actualizarHospitalesSubscription = new Subscription();
  public eliminarHospitalesSubscription = new Subscription();
  public searchTerm = new Subject<string>();
  public hospitalesTemp: Hospital[] = [];

  ngOnInit(): void {
    this.cargarHospitales();

    this.searchTerm
      .pipe(
        debounceTime(300),
        switchMap((term: string) =>
          this.busquedaService.buscar('hospitales', term)
        )
      )
      .subscribe((hospitales) => {
        this.hospitales = hospitales;
      });

    this.modalSubscription = this.modalService.nuevaImage
      .pipe(
        delay(100) //como la carga es muy rápida esperamos un poco para que el servidor que se pueda refrescar
      )
      .subscribe((img) => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this.cargarHospitalesSubscription = this.hospitalService
      .cargarHospitales()
      .subscribe((hospitales) => {
        this.cargando = false;
        this.hospitales = hospitales;
        this.hospitalesTemp = hospitales;
      });
  }

  guardarHospital(hospital: Hospital) {
    this.actualizarHospitalesSubscription = this.hospitalService
      .actualizarHospital(hospital.nombre, hospital._id!)
      .subscribe((resp) => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  eliminarHospital(hospital: Hospital) {
    this.eliminarHospitalesSubscription = this.hospitalService
      .eliminarHospital(hospital._id!)
      .subscribe((resp) => {
        this.cargarHospitales();
        Swal.fire('Eliminado', hospital.nombre, 'success');
      });
  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Create hosital',
      input: 'text',
      inputLabel: 'Hospital Name',
      inputPlaceholder: 'Enter the hospital name',
      showCancelButton: true,
    });

    if (!value) return;

    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value).subscribe((resp: any) => {
        this.hospitales.push(resp.hospitalDb);
      });
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalService.abrirModal('hospitales', hospital._id!, hospital.img);
  }

  buscarHospital(term: string) {
    if (term.length === 0) {
      this.hospitales = this.hospitalesTemp;
      return;
    }
    this.searchTerm.next(term);
  }

  ngOnDestroy(): void {
    this.cargarHospitalesSubscription.unsubscribe();
    this.modalSubscription.unsubscribe();
    this.actualizarHospitalesSubscription.unsubscribe();
    this.eliminarHospitalesSubscription.unsubscribe();
  }
}
