import { Component, inject } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent {

  private router = inject(Router)
  titulo = ''

  constructor(){
   this.getArgumentosRuta()
  }

  getArgumentosRuta(){
    this.router.events.pipe(
      //filtramos para poder tener el titulo de la web
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((data: ActivationEnd) => data.snapshot.firstChild === null),
      map((data:ActivationEnd) => data.snapshot.data)
    ).subscribe(data => {
      this.titulo = data['titulo']
      document.title = `Admin Pro - ${this.titulo}`
    })
  }
}
