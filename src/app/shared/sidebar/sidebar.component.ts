import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Menu } from '../../interface/menu.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  private sidebarService = inject(SidebarService)

  menuItems: Menu[]= []

   constructor(){
    this.menuItems = this.sidebarService.menu
   }
}
