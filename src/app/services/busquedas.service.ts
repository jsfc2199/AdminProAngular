import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
import { map } from 'rxjs';

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
      map((resp: any) => resp.data)
    )
  }
}
