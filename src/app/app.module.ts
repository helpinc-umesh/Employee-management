import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule ,MAT_DIALOG_DATA } from '@angular/material';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { NavbarComponent } from '../app/component/navbar/navbar.component';
import { EmployeeInfoEditComponent } from '../app/component/employees information/child/employee-info-edit.component';
import { EmployeeInfoComponent } from '../app/component/employees information/employees-info.component';

import { EmployeeModule } from './component/employees information/employee.module';
import { EmployeeService } from '../app/shared/employee.service';
import { ConfirmDeleteComponent } from '../app/component/my-profile/child/confirmDelete.component';

@NgModule({
  imports:
    [
      BrowserModule, BrowserAnimationsModule, AppRoutes, FormsModule , ReactiveFormsModule , MatDialogModule , EmployeeModule
    ],

  declarations: [AppComponent ,NavbarComponent ,ConfirmDeleteComponent ],
  providers: [EmployeeService,{ provide: MAT_DIALOG_DATA, useValue: {} }],
  entryComponents: [ConfirmDeleteComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }


