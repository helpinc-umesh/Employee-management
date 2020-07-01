import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { NavbarService } from './modules/navbar/navbar.service';

@NgModule({
  declarations: [
    AppComponent, NavbarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [NavbarService],
  schemas: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
