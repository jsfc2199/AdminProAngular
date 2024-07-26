import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styleUrl: './busquedas.component.css'
})
export class BusquedasComponent {

  private activatedRoute = inject(ActivatedRoute)

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(({term}) => console.log(term))
  }
}
