import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeComponent } from './emplyee.component';
import { EmployeeService } from './employee.service';
import { EmployeeFormComponent } from './employee-form.component';

@NgModule({
    declarations: [EmployeeComponent, EmployeeFormComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: EmployeeComponent }
        ])
    ],
    exports: [],
    providers: [EmployeeService],
    entryComponents: [EmployeeFormComponent]
})
export class EmployeeModule { }
