import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private fb: FormBuilder                = inject(FormBuilder)
  private usuarioService: UsuarioService = inject(UsuarioService)
  private router: Router                 = inject(Router)

  public formSubmitted = false;
  @ViewChild('googleBtn') googleBtn!: ElementRef

  public signInForm: FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false],

  })

  ngAfterViewInit(): void {
    this.googleInit()
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id:
        "780420120770-9nljp36bfii6d70hkvp6tepol8v18t72.apps.googleusercontent.com",
      callback: (response:any) =>  this.handleCredentialResponse(response), //lo modificamos porque haremos uso al this para hacer referencia al componente
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" } // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    this.usuarioService.loginGoogle(response.credential)
    .subscribe(resp => {
      this.router.navigateByUrl('/')
    })

  }

  login(){
    this.usuarioService.login(this.signInForm.value)
    .subscribe({
      next: (resp) => {
        if(this.signInForm.get('remember')?.value){
          localStorage.setItem('email', this.signInForm.get('email')?.value)
        }else{
          localStorage.removeItem('email')
        }
      },
      complete: () => this.router.navigateByUrl('/'),
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      }
    })
  }


}
