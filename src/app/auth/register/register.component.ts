import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  },{
    validators: this.samePasswords('password', 'password2') //validadores personalizados
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
