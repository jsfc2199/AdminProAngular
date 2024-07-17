import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrl: './incrementador.component.css'
})
export class IncrementadorComponent {

  @Input()  progress: number = 50

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
