import { Component, inject } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css',
})
export class BreadcrumbsComponent {
  private router = inject(Router);
  titulo = '';
  subscription: Subscription = new Subscription();

  constructor() {
    this.subscription = this.getArgumentosRuta().subscribe((data) => {
      this.titulo = data['titulo'];
      document.title = `Admin Pro - ${this.titulo}`;
    });
  }

  getArgumentosRuta() {
    return this.router.events.pipe(
      //filtramos para poder tener el titulo de la web
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((data: ActivationEnd) => data.snapshot.firstChild === null),
      map((data: ActivationEnd) => data.snapshot.data)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
