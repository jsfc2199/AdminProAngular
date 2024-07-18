import { Component } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css',
})
export class AccountSettingsComponent {
  //obtenemos el elemento del index <link href="assets/css/colors/default-dark.css" id="theme" rel="stylesheet">
  linkTheme = document.querySelector('#theme');
  links!: NodeListOf<Element>;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }

  changeTheme(theme: string) {
    const url = `assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    this.links.forEach((item) => {
      item.classList.remove('working');
      const bthTheme = item.getAttribute('data-theme');
      const btnThemeUrl = `assets/css/colors/${bthTheme}.css`;

      const currentTheme = this.linkTheme?.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        item.classList.add('working');
      }
    });
  }
}
