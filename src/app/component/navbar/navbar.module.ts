import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';

import { NavbarComponent } from './navbar.component';
import { EmployeeInfoEditComponent } from '../employees information/child/employee-info-edit.component';


@NgModule({
    imports:[
        CommonModule,MatDialogModule ,FormsModule ,ReactiveFormsModule,
    ],
    declarations:[NavbarComponent,EmployeeInfoEditComponent],
    providers:[],
    entryComponents:[EmployeeInfoEditComponent]
})
export class NavbarModule {}