import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private router: Router                 = inject(Router)
  private fb: FormBuilder                = inject(FormBuilder)
  private usuarioService: UsuarioService = inject(UsuarioService)

  public formSubmitted = false;

  public signInForm: FormGroup = this.fb.group({
    email: ['test100@test100', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
    remember: [false],

  })
  login(){
    this.usuarioService.login(this.signInForm.value)
    .subscribe({
      next: (resp) => console.log(resp),
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      }
    })
   
  }
}
