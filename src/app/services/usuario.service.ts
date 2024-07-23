import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterForm } from '../auth/interfaces/register-form.interface';
import { environments } from '../../environments/environment';

const baseUrl = environments.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private http: HttpClient = inject(HttpClient)

  crearUsuario(formData: RegisterForm){
    return this.http.post(`${baseUrl}/usuarios`, formData)
  }
}
