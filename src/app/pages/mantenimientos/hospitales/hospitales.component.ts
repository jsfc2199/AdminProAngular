import { Component, inject } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
})
export class HospitalesComponent {
  private hospitalService = inject(HospitalService)

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.hospitalService.cargarHospitales()
    .subscribe(hospitales => console.log(hospitales))
  }
}
