import { Component , OnInit } from '@angular/core';
import { MatDialog , MatDialogRef } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { filter , map } from 'rxjs/operators';
import { range } from 'rxjs';

import { EmployeeService } from '../../../../shared/employee.service';
import { ISelect } from '../../../../interfaces/IProfile';
import { AddQualification } from '../../child/qualification/child/addQualification.component';
import { ConfirmDeleteComponent } from '../../../my-profile/child/confirmDelete.component';

@Component({
    templateUrl:'./qualificationList.component.html'
})

export class QualificationList implements OnInit {
    qualificationlist:ISelect[] = [];
    dialogRef:MatDialogRef<AddQualification>;
    selection = new SelectionModel<number>(true, []);
    confirmDelete: MatDialogRef<ConfirmDeleteComponent>;

    constructor(private employeeService: EmployeeService,private dialog:MatDialog) {}

    isAllSelected() {
        return this.selection.selected.length === this.qualificationlist.length;
    }

    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.qualificationlist.forEach(d => this.selection.select(d.id));
    }

    ngOnInit() {
        this.employeeService.qualification().subscribe(data => this.qualificationlist = data);
    }

    add(id: number) {
        let data = this.qualificationlist;
        let author = id > 0 ? data.find(x => x.id === id) : null;
        this.dialogRef = this.dialog.open(AddQualification, {
            height: '250px',
            width: '40%',
            data: author ? author : null
        });
        this.dialogRef.afterClosed().subscribe(() => {
            let newdata = this.dialogRef.componentInstance.sendData;
            if (!newdata) return;
            this.employeeService.onQualificationTable(newdata)
                .pipe(filter(success => success),
            ).subscribe(el => {
                let index = data.findIndex(x => x.id === id);
                if (index > -1) {
                    data[index] = newdata;
                } else {
                    this.employeeService.addQualification(newdata);
                }
            });
        });
    }

    onDelete() {
        this.confirmDelete = this.dialog.open(ConfirmDeleteComponent, {
            height: '150px',
            width: '25%'
        });
        this.confirmDelete.afterClosed().subscribe(result => {
            if (result) {
                let data = this.qualificationlist;
                let selected = this.selection.selected;
                this.employeeService.select = selected;
                range(0, selected.length).pipe(
                    map(delIndex => data.findIndex(x => x.id === selected[delIndex])),
                    filter(index => index > -1)).subscribe(index => {
                        data.splice(index, 1);
                        this.selection.clear();
                    });
                // this.employeeService.deleteCountry();
            }
        });
    }

}