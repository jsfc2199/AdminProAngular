import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent {
//obtenemos el elemento del index <link href="assets/css/colors/default-dark.css" id="theme" rel="stylesheet">
linkTheme = document.querySelector('#theme')
  ngOnInit(): void {

    const url = localStorage.getItem('theme') || 'assets/css/colors/default-dark.css'
    this.linkTheme?.setAttribute('href', url)

  }
}
