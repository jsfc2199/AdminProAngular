import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
import { map } from 'rxjs';
import { Medicos } from '../models/medicos.model';

const baseUrl = environments.base_url;
@Injectable({
  providedIn: 'root',
})
export class MedicosService {
  constructor() {}

  private http = inject(HttpClient);

  cargarMedicos() {
    const url = `${baseUrl}/medicos`;
    return this.http
      .get<{ ok: boolean; medicos: Medicos[] }>(url, this.headers)
      .pipe(map((resp: { ok: boolean; medicos: Medicos[] }) => resp.medicos));
  }

  getMedicoById(id: string) {
    const url = `${baseUrl}/medicos/${id}`;
    return this.http
      .get<{ ok: boolean; medico: Medicos}>(url, this.headers)
      .pipe(map((resp: { ok: boolean; medico: Medicos }) => resp.medico));
  }

  crearMedico(medico: {nombre: string, hospital: string}) {
    const url = `${baseUrl}/medicos`;
    return this.http.post(url, medico, this.headers);
  }

  actualizarMedico(medico: Medicos) {
    const url = `${baseUrl}/medicos/${medico._id}`;
    return this.http.put(url, medico, this.headers);
  }

  eliminarMedicos(_id: string) {
    const url = `${baseUrl}/medicos/${_id}`;
    return this.http.delete(url, this.headers);
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  get token() {
    return localStorage.getItem('token') ?? '';
  }
}
