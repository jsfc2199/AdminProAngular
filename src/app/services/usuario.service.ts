import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterForm } from '../auth/interfaces/register-form.interface';
import { environments } from '../../environments/environment';
import { LoginForm } from '../auth/interfaces/login-form.interface';
import { tap } from 'rxjs';

const baseUrl = environments.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private http: HttpClient = inject(HttpClient)

  crearUsuario(formData: RegisterForm){
    return this.http.post(`${baseUrl}/usuarios`, formData)
    .pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    )
  }

  login(formData: LoginForm){
    return this.http.post(`${baseUrl}/login`, formData)
    .pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    )
  }
}
