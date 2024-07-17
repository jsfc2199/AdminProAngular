import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrl: './incrementador.component.css',
})
export class IncrementadorComponent {
  @Input() progress: number = 40;
  @Input() btnClass: string = 'btn btn-primary'


  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  cambiarValor(valor: number) {
    if (this.progress >= 100 && valor > 0) {
      this.valorSalida.emit(100);
      this.progress = 100;
      return;
    }
    if (this.progress <= 0 && valor < 0) {
      this.valorSalida.emit(0);

      this.progress = 0;
      return;
    }
    this.progress = this.progress + valor;
    this.valorSalida.emit(this.progress);
  }
}
