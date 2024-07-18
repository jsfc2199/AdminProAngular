import { Component } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrl: './promesas.component.css',
})
export class PromesasComponent {
  ngOnInit(): void {
    // const promesa = new Promise((resolve) => {
    //   resolve('Hola Mundo');
    // });

    // promesa
    //   .then((mensaje) => {
    //     console.log(mensaje);
    //   })
    //   .catch((error) => console.log(error));

    // console.log('fin del init');

    this.getUsuarios().then(usuarios => console.log(usuarios))
  }

  //Creando función que retorna promesa
  getUsuarios(){
    const promise = new Promise((resolve, reject) => {
      fetch('https://reqres.in/api/users')
      .then(resp => resp.json())
      .then(body => resolve(body.data))
      .catch(error => reject(error))

    })
    return promise
  }
}
