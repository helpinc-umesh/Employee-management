import { Component , OnInit } from '@angular/core';
import { MatDialog , MatDialogRef } from '@angular/material';

import { EmployeeService } from '../../../../../app/shared/employee.service';
import { ISelect } from  '../../../../interfaces/IProfile';
import { AddRoleComponent } from '../role/child/addrole.component';
import { filter } from 'rxjs/operators';

@Component({
    templateUrl:'./roleList.component.html'
})

export class RoleListComponent implements OnInit {
    roles:ISelect[]=[];
    dialogRef:MatDialogRef<AddRoleComponent>;

    constructor(private employeeService:EmployeeService,private dialog:MatDialog) {}

    ngOnInit() {
        this.employeeService.Role().subscribe(data => this.roles = data);
    }

    add(id: number) {
        let data = this.roles;
        let author = id > 0 ? data.find(x => x.id === id) : null;
        this.dialogRef = this.dialog.open(AddRoleComponent, {
            height: '250px',
            width: '40%',
            data: author ? author : null
        });
        this.dialogRef.afterClosed().subscribe(() => {
            let newdata = this.dialogRef.componentInstance.sendData;
            if (!newdata) return;
            this.employeeService.onRoleTable(newdata)
                .pipe(filter(success => success),
            ).subscribe(el => {
                let index = data.findIndex(x => x.id === id);
                if (index > -1) {
                    data[index] = newdata;
                } else {
                    this.employeeService.addRole(newdata);
                }
            });
        });
    }

}