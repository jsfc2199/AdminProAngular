import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const usuarioService: UsuarioService = inject(UsuarioService)
  const router: Router = inject(Router);

  return  usuarioService.validarToken().pipe(
    tap(isAuth => {
      if(!isAuth){
        router.navigateByUrl('/login')
      }
    })
  );
};
