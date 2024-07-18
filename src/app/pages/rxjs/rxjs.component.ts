import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css',
})
export class RxjsComponent {
  //creando un observable de manera manual
  constructor() {
    const obs$ = new Observable((observer) => {
      let i = -1;
      //el observer emite los valores, cuando termina, cuando da error
      const invervalo = setInterval(() => {
        i++;
        observer.next(i); //emitimos el evento

        if (i === 4) {
          clearInterval(invervalo);
          observer.complete();
        }
      }, 1000);
    });

    obs$.subscribe({
      next: (valor) => console.log(`sub, ${valor}`),
      error: (error) => console.log(error),
      complete: () => console.log('completado'),
    });
  }
}
