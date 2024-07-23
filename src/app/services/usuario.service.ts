import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterForm } from '../auth/interfaces/register-form.interface';
import { environments } from '../../environments/environment';
import { LoginForm } from '../auth/interfaces/login-form.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

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

  loginGoogle(token: string){
    return this.http.post(`${baseUrl}/login/google`, {token})
    .pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    )
  }

  //Con esto aprovechamos y actualizamos el token nuevamente
  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || ''

    return this.http.get(`${baseUrl}/login/renew`, {
      headers:{
        'x-token': token
      }
    }).pipe(
      //renovamos el token
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      }),
      map(resp => true), //luego de renovar retornamos true para el guardian
      catchError(error => of(false))
    )

  }
}
