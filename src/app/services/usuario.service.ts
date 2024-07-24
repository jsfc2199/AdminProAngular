import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterForm } from '../auth/interfaces/register-form.interface';
import { environments } from '../../environments/environment';
import { LoginForm } from '../auth/interfaces/login-form.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/users.model';
import { CargarUsuario } from '../interface/cargar-usuarios.interface';

const baseUrl = environments.base_url
declare const google: any

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private http: HttpClient = inject(HttpClient)
  private router: Router = inject(Router)

  public usuario?: User

  get token(){
    return localStorage.getItem('token') ?? ''
  }

  get uuid(){
    return this.usuario?.uuid ?? ''
  }

  crearUsuario(formData: RegisterForm){
    return this.http.post(`${baseUrl}/usuarios`, formData)
    .pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    )
  }

  actualizarPerfil(data: {email: string, nombre: string, role: string | undefined}){
    data = {
      ...data,
      role: this.usuario!.role
    }
    return this.http.put(`${baseUrl}/usuarios/${this.uuid}`, data, {
      headers:{
        'x-token': this.token
      }
    })
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
        localStorage.setItem('email', resp.email)
        localStorage.setItem('token', resp.token)
      })
    )
  }

  //Con esto aprovechamos y actualizamos el token nuevamente
  validarToken(): Observable<boolean>{
    // const token = localStorage.getItem('token') ?? ''
    return this.http.get(`${baseUrl}/login/renew`, {
      headers:{
        'x-token': this.token
      }
    }).pipe(
      //renovamos el token
      //se remueve el tap porque puede ser que se resuelva el map primero que el tap, por lo que se maneja directamente en el map
      map((resp: any) => {
        //centralizamos la información del usuario
        const {
          email,
          google,
          img='',//por si el usuario no tiene imagen, no se rompa la app
          nombre,
          role,
          uuid
        } = resp.userDb
        this.usuario = new User(nombre,email, '',role, google, img, uuid)

        localStorage.setItem('token', resp.token)
        return true
      }),
       //luego de renovar retornamos true para el guardian
      catchError(error => of(false))
    )

  }

  logout(){
    const email = localStorage.getItem('email')
    localStorage.removeItem('token')
    localStorage.removeItem('email')

    google.accounts.id.revoke(email, () =>{})

  }

  cargarUsuarios(desde:number = 0){
    const url = `${baseUrl}/usuarios?desde=${desde}`
    return this.http.get<CargarUsuario>(url, this.headers)
  }

  get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    }
  }
}
