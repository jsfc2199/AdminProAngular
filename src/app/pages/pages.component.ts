import { Component, inject } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunction(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent {
  private settingsService = inject(SettingsService);
  private sidebarService = inject(SidebarService)

  ngOnInit(): void {
    customInitFunction();
    this.sidebarService.cargarMenu()
  }
}
