import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private fb: FormBuilder = inject(FormBuilder)
  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]],
    terms: [false, [Validators.required]],
  })

  crearUsuario(){
    this.formSubmitted = true;
    console.log(this.registerForm.value)
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
}
