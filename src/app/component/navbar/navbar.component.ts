import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { EmployeeService } from '../../shared/employee.service';
import { EmployeeInfoEditComponent } from '../employees information/child/employee-info-edit.component';

@Component({
    selector: 'nav-bar',
    templateUrl: './navbar.component.html',
    styles: [``]
})


export class NavbarComponent {
    dialogRef: MatDialogRef<EmployeeInfoEditComponent>; // Open Dialog for Register new employee

    constructor(
        private router: Router,
        private employeeService: EmployeeService,
        public dialog: MatDialog
    ) { }


    register(id: number) {
        this.dialogRef = this.dialog.open(EmployeeInfoEditComponent, {
            height: '600px',
            width: '60%',
        });

        this.dialogRef.afterClosed().subscribe(() => {
            let newdata = this.dialogRef.componentInstance.sendData;// newdata = EmployeeInfoEditComponent.formValue 
            if (!newdata) return;
            this.employeeService.register(newdata); // Register data on Repository
            this.router.navigate(['/login']);
        });
    }

    logout() {
        this.employeeService.currentUser = undefined;
    }


}

