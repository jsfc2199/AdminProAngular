import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private fb: FormBuilder = inject(FormBuilder)

  public registerForm = this.fb.group({
    name: ['juan', [Validators.required, Validators.minLength(3)]],
    email: ['test100@gmail.com', [Validators.required]],
    password: ['123456', [Validators.required]],
    password2: ['123456', [Validators.required]],
    terms: [false, [Validators.required]],
  })

  crearUsuario(){
    console.log(this.registerForm.value)
  }
}
