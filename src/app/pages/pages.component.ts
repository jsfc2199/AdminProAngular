import { Component, inject } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunction(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent {
  private settingsService = inject(SettingsService);

  ngOnInit(): void {
    customInitFunction();
  }
}
