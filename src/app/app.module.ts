import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, NoPageFoundComponent],
  imports: [BrowserModule, AppRoutingModule, PagesModule, AuthModule],
  providers: [
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
