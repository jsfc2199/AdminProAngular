import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterForm } from '../auth/interfaces/register-form.interface';
import { environments } from '../../environments/environment';
import { LoginForm } from '../auth/interfaces/login-form.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/users.model';
import { CargarUsuario } from '../interface/cargar-usuarios.interface';

const baseUrl = environments.base_url;
declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  public usuario?: User;

  get token() {
    return localStorage.getItem('token') ?? '';
  }

  get uuid() {
    return this.usuario?.uuid ?? '';
  }

  guardarLocalStorage(token: string, menu: any) {
    const menuString = JSON.stringify(menu)
    localStorage.setItem('token', token );
    localStorage.setItem('menu', menuString);
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${baseUrl}/usuarios`, formData).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    );
  }

  actualizarPerfil(data: {
    email: string;
    nombre: string;
    role: string | undefined;
  }) {
    data = {
      ...data,
      role: this.usuario!.role,
    };
    return this.http.put(
      `${baseUrl}/usuarios/${this.uuid}`,
      data,
      this.headers
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${baseUrl}/login`, formData).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${baseUrl}/login/google`, { token }).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    );
  }

  //Con esto aprovechamos y actualizamos el token nuevamente
  validarToken(): Observable<boolean> {
    // const token = localStorage.getItem('token') ?? ''
    return this.http
      .get(`${baseUrl}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        //renovamos el token
        //se remueve el tap porque puede ser que se resuelva el map primero que el tap, por lo que se maneja directamente en el map
        map((resp: any) => {
          //centralizamos la información del usuario
          const {
            email,
            google,
            img = '', //por si el usuario no tiene imagen, no se rompa la app
            nombre,
            role,
            uuid,
          } = resp.userDb;
          this.usuario = new User(nombre, email, '', role, google, img, uuid);

          this.guardarLocalStorage(resp.token, resp.menu)
          return true;
        }),
        //luego de renovar retornamos true para el guardian
        catchError((error) => of(false))
      );
  }

  logout() {
    const email = localStorage.getItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('menu');


    google.accounts.id.revoke(email, () => {});
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${baseUrl}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers).pipe(
      map((resp) => {
        const usuarios = resp.usuarios.map(
          (user) =>
            new User(
              user.nombre,
              user.email,
              '',
              user.role,
              user.google,
              user.img,
              user.uuid
            )
        );
        return {
          total: resp.total,
          usuarios,
        };
      })
    );
  }

  eliminarUsuario(usuario: User) {
    const url = `${baseUrl}/usuarios/${usuario.uuid}`;
    return this.http.delete(url, this.headers);
  }

  guardarUsuario(usuario: User) {
    return this.http.put(
      `${baseUrl}/usuarios/${usuario.uuid}`,
      usuario,
      this.headers
    );
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }
}
