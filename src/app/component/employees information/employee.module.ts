import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {
    MatDialogModule, MAT_DIALOG_DATA, MatSortModule, MatPaginatorModule, MatCheckboxModule,
    MatTableModule, MatMenuModule, MatFormFieldModule, MatSelectModule
} from '@angular/material';

import { EmployeeInfoComponent } from './employees-info.component';
import { ExpandComponent } from './expanded data/expand.component';
import { EmployeeInfoEditComponent } from './child/employee-info-edit.component';
import { ConfirmDeleteComponent } from '../my-profile/child/confirmDelete.component';

@NgModule({
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatSortModule, MatPaginatorModule, MatCheckboxModule, MatTableModule, MatMenuModule, MatFormFieldModule, MatSelectModule, NgxMatSelectSearchModule,
        RouterModule.forChild([
            { path: '', component: EmployeeInfoComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
        ])
    ],
    declarations: [EmployeeInfoComponent, ExpandComponent, EmployeeInfoEditComponent],
    providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    entryComponents: [ExpandComponent, EmployeeInfoEditComponent]

})
export class EmployeeModule {

}