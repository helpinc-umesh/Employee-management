import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { filter, map } from 'rxjs/operators';
import { MatDialogRef, MatDialog } from '@angular/material';
import { range } from 'rxjs';

import { EmployeeService } from '../../../../shared/employee.service';
import { ISelect } from '../../../../interfaces/IProfile';
import { AddColorComponent } from '../color/child/addcolor.component';
import { ConfirmDeleteComponent } from '../../../my-profile/child/confirmDelete.component';

@Component({
    templateUrl: './colorList.component.html'
})

export class ColorListComponent implements OnInit {
    colors: ISelect[] = [];
    dialogRef: MatDialogRef<AddColorComponent>;
    selection = new SelectionModel<number>(true, []);
    confirmDelete: MatDialogRef<ConfirmDeleteComponent>;

    constructor(private employeeService: EmployeeService, private dialog: MatDialog) {

    }

    isAllSelected() {
        return this.selection.selected.length === this.colors.length;
    }

    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.colors.forEach(d => this.selection.select(d.id));
    }

    ngOnInit() {
        this.employeeService.color().subscribe(data => this.colors = data);
    }

    add(id: number) {
        let data = this.colors;
        let author = id > 0 ? data.find(x => x.id === id) : null;
        this.dialogRef = this.dialog.open(AddColorComponent, {
            height: '250px',
            width: '40%',
            data: author ? author : null
        });
        this.dialogRef.afterClosed().subscribe(() => {
            let newdata = this.dialogRef.componentInstance.sendData;
            if (!newdata) return;
            this.employeeService.onColorTable(newdata)
                .pipe(filter(success => success),
            ).subscribe(el => {
                let index = data.findIndex(x => x.id === id);
                if (index > -1) {
                    data[index] = newdata;
                } else {
                    this.employeeService.addColor(newdata);
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
                let data = this.colors;
                let selected = this.selection.selected;
                this.employeeService.select = selected;
                range(0, selected.length).pipe(
                    map(delIndex => data.findIndex(x => x.id === selected[delIndex])),
                    filter(index => index > -1)).subscribe(index => {
                        data.splice(index, 1);
                        this.selection.clear();
                    });
                this.employeeService.deleteRole();
            }
        });
    }

}