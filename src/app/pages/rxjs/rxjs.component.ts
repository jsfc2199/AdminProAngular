import { Component } from '@angular/core';
import { filter, interval, map, Observable, retry, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css',
})
export class RxjsComponent {
  //creando un observable de manera manual
  constructor() {
    // this.retornaObservable()
    //   .pipe(
    //     retry(1) //al tener let i fuera del observable mantiene su valor y al reintentar reintenta con el valor que lleva
    //     //si i es dentro del observador se reinicia a 0, y le podemos colocar un limite de intentos
    //   )
    //   .subscribe({
    //     next: (valor) => console.log(`sub, ${valor}`),
    //     error: (error) => console.log(error),
    //     complete: () => console.log('completado'),
    //   });

    this.retornaIntervalo().pipe(
      map(valor => valor +1), //transforma la información del intervalo
      filter(valor => (valor % 2 === 0) )
    ).subscribe((valor) => {
      console.log(valor)
    })
  }

  retornaIntervalo(){
    const interval$ = interval(500)
    .pipe(
      take(10) //solo tomamos 4 emisiones
    )
    return interval$
  }

  //Función que retorna observable
  retornaObservable() {
    let i = -1;
    const obs$ = new Observable<number>((observer) => {
      //el observer emite los valores, cuando termina, cuando da error
      const invervalo = setInterval(() => {
        i++;
        observer.next(i); //emitimos el evento

        if (i === 4) {
          clearInterval(invervalo);
          observer.complete();
        }
        if (i === 2) {
          observer.error('i llego a 2');
        }
      }, 1000);
    });

    return obs$;
  }
}
