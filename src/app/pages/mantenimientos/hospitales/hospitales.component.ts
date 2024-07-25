import { Component, inject } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
})
export class HospitalesComponent {
  private hospitalService = inject(HospitalService);
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;

  ngOnInit(): void {
    this.cargarHospitales()
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe((hospitales) => {
      this.cargando = false;
      this.hospitales = hospitales;
    });
  }
}
