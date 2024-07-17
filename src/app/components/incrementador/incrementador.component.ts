import { Component } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrl: './incrementador.component.css'
})
export class IncrementadorComponent {

  progress: number = 50

  get porcentaje(){
    return `${this.progress}%`
  }

  cambiarValor(valor: number){
    if(this.progress >= 100 && valor > 0){
      this.progress = 100
      return
    }
    if(this.progress <= 0 && valor < 0) {
      this.progress = 0
      return
    }
    this.progress = this.progress + valor
  }
}
