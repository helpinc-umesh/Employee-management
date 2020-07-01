import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { IProfile } from '../../interfaces/IProfile';
import { EmployeeService } from '../../shared/employee.service';
import { EmployeeInfoEditComponent } from '../employees information/child/employee-info-edit.component';
import { ConfirmDeleteComponent } from './child/confirmDelete.component';

@Component({
    templateUrl: './my-profile.component.html'
})

export class MyProfile implements OnInit {
    loggedUser: IProfile;
    dialogRef: MatDialogRef<EmployeeInfoEditComponent>;
    deleteDialogRef: MatDialogRef<ConfirmDeleteComponent>;

    constructor(
        private employeeService: EmployeeService,
        public dialog: MatDialog,
        private router: Router
    ) { }

    ngOnInit() {
        this.employeeService.get().subscribe(data => this.loggedUser = data);
    }

    onEdit(id: number) {
        let user = this.loggedUser; // To Send loggedUser data to Opened form 
        this.dialogRef = this.dialog.open(EmployeeInfoEditComponent, {
            height: '500px',
            width: '60%',
            data: user ? user : null
        });
        this.dialogRef.afterClosed().subscribe(() => {
            let copy = this.loggedUser;
            let newdata = this.dialogRef.componentInstance.sendData;
            if (!newdata) return;
            copy = newdata;
            this.employeeService.myData = copy;
            this.employeeService.onEdit(newdata)
                .subscribe(update => copy = update); // Edit data on Repository
        });
    }

    onDelete(id: number) {
        this.deleteDialogRef = this.dialog.open(ConfirmDeleteComponent, {
            width: '25%',
            height: '150px'
        });
        this.deleteDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.employeeService.currentUser = undefined;
                this.loggedUser = undefined;
                this.router.navigate(['/login']);
                this.employeeService.onDelete(id);
            }
        });
    }

    back() {
        this.router.navigate(['/home']);
    }

}