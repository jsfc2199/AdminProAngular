import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { switchMap } from 'rxjs';
import { User } from '../../models/users.model';
import { Medicos } from '../../models/medicos.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styleUrl: './busquedas.component.css',
})
export class BusquedasComponent {
  private activatedRoute = inject(ActivatedRoute);
  private busquedaService = inject(BusquedasService);

  public usuarios: User[] = [];
  public medicos: Medicos[] = [];
  public hospitales: Hospital[] = [];

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ term }) => this.busquedaService.busquedaGlobal(term)))
      .subscribe((resp:any) => {
        this.hospitales = resp.hospitales
        this.medicos = resp.medicos
        this.usuarios = resp.usuarios
      });
  }

  abrirMedico(medico: Medicos){

  }
}
