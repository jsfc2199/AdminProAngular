import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
})
export class MedicoComponent {

  private fb = inject(FormBuilder)
  private hospitalService = inject(HospitalService)

  public medicoForm: FormGroup
  public hospitales: Hospital[]= []

  constructor(){
    this.medicoForm = this.fb.group({
      nombre: ['Juan', [Validators.required]],
      hospital: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.cargarHospitales()
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
    .subscribe((hospitales: Hospital[])=> {
      this.hospitales = hospitales
    })
  }

  guardarMedico(){
    console.log(this.medicoForm.value)
  }
}
