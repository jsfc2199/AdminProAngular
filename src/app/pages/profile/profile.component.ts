import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {

  private fb: FormBuilder = inject(FormBuilder)
  private usuarioService: UsuarioService = inject(UsuarioService)

  profileForm!: FormGroup
  ngOnInit(): void {

    this.profileForm = this.fb.group({
      nombre: ['123', [Validators.required]],
      email: ['abc', [Validators.required, Validators.email]],
    })
  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.profileForm.value)
    .subscribe(res=> {
      console.log(res)
    })

  }

}
