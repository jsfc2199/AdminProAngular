import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
import { map } from 'rxjs';
import { Hospital } from '../models/hospital.model';

const baseUrl = environments.base_url
@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor() { }

  private http = inject(HttpClient)

  get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    }
  }

  get token(){
    return localStorage.getItem('token') ?? ''
  }

  cargarHospitales(){
    const url = `${baseUrl}/hospitales`
    return this.http.get<{ ok: boolean, hospitales: Hospital[] }>(url, this.headers)
    .pipe(
      map( (resp: {ok: boolean, hospitales: Hospital[] })  => resp.hospitales)
    )
  }

  crearHospital(nombre: string){
    const url = `${baseUrl}/hospitales`
    return this.http.post(url, {nombre}, this.headers)    
  }

  actualizarHospital(nombre: string, _id: string){
    const url = `${baseUrl}/hospitales/${_id}`
    return this.http.put(url, {nombre}, this.headers)    
  }

  eliminarHospital( _id: string){
    const url = `${baseUrl}/hospitales/${_id}`
    return this.http.delete(url, this.headers)    
  }
}
