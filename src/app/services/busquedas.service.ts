import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
import { map } from 'rxjs';
import { User } from '../models/users.model';
import { Hospital } from '../models/hospital.model';

const baseUrl = environments.base_url
@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  private http: HttpClient = inject(HttpClient)

  get token(){
    return localStorage.getItem('token') ?? ''
  }

  get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    }
  }

  buscar(tipo: 'hospitales' |  'Medicos' | 'usuarios', termino: string){
    const url = `${baseUrl}/todo/collection/${tipo}/${termino}`
    return this.http.get<any[]>(url, this.headers)
    .pipe(
      map((resp: any) => {
        switch(tipo){
          case 'usuarios':
            return this.transformarUsuarios(resp.data) //transformamos la data para ver la imagen de un usuario correctamente
          case 'hospitales':            
            return this.transformarHospital(resp.data)
          default:
            return []
        }
      })
    )
  }

  private transformarUsuarios(resultados: any[]): User[]{
    return resultados.map(user => new User(user.nombre, user.email, '', user.role, user.google, user.img, user.img))
  }

  private transformarHospital(resultados: any[]): Hospital[]{
    return resultados
  }
}
