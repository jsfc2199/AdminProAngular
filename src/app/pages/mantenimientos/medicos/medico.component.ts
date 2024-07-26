import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { MedicosService } from '../../../services/medicos.service';
import { Medicos } from '../../../models/medicos.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
})
export class MedicoComponent {
  private fb = inject(FormBuilder);
  private hospitalService = inject(HospitalService);
  private medicoService = inject(MedicosService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado!: Hospital;
  public medicoSeleccionado!: Medicos;

  constructor() {
    this.medicoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      hospital: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.cargarHospitales();

    //nos suscribimos al hospital para detectar los cambios cuando se seleccione otro hospital y obtener el id
    this.medicoForm.get('hospital')?.valueChanges.subscribe((hospitalId) => {
      this.hospitalSeleccionado = this.hospitales.find(
        (hospital) => hospital._id === hospitalId
      )!;
    });

    this.cargarMedico();
  }

  cargarMedico() {
    this.activatedRoute.params
      .pipe(
        filter(({ id }) => id !== 'nuevo'),
        switchMap(({ id }) => this.medicoService.getMedicoById(id))
      )
      .subscribe((medico) => {
        if (!medico) {
          this.router.navigateByUrl(`/dashboard/medicos`);
          return;
        }
        const { nombre, hospital } = medico;
        const hospitalId = hospital?._id;

        this.medicoSeleccionado = medico;

        //establecemos el valor del formulario cuando se ingresa a la ruta medico/:id es decir, al editar
        this.medicoForm.setValue({ nombre, hospital: hospitalId });
      });
  }

  cargarHospitales() {
    this.hospitalService
      .cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      ///actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id,
      };
      this.medicoService.actualizarMedico(data).subscribe((resp) => {
        console.log(resp);
        Swal.fire(
          'Actualizado',
          `${nombre} actualizado correctamente`,
          'success'
        );
      });
    } else {
      //crear
      this.medicoService
        .crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${resp.medicoDb._id}`);
        });
    }
  }
}
