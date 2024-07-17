import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {

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
