import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private fb: FormBuilder = inject(FormBuilder)
  private usuarioService: UsuarioService = inject(UsuarioService)
  private router: Router = inject(Router)
  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['juan', [Validators.required, Validators.minLength(3)]],
    email: ['test100@test100', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
    password2: ['123456', [Validators.required]],
    terms: [true, [Validators.requiredTrue]],
  },{
    validators: this.samePasswords('password', 'password2') //validadores personalizados
  })

  crearUsuario(){
    if(this.registerForm.invalid) return
    this.formSubmitted = true;

    this.usuarioService.crearUsuario(this.registerForm.value)
    .subscribe({
      next: resp => this.router.navigateByUrl('/'),
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      }
    })
  }

  notValidField(campo: string): boolean {
    if(this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true
    }
    return false
  }

  acceptTerms(){
    return !this.registerForm.get('terms')?.value && this.formSubmitted
  }

  samePasswords(pass1: string, pass2: string){
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1)
      const pass2Control = formGroup.get(pass2)

      if(pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null)
      }else{
        pass2Control?.setErrors({notEqual: true})
      }
    }
  }

  passwords(){
    const pass1 = this.registerForm.get('password')?.value
    const pass2 = this.registerForm.get('password2')?.value

    if((pass1 !== pass2) && this.formSubmitted){
      return true
    }else{
      return false
    }

  }
}
