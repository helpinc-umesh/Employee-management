import { Component, OnInit ,Inject } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { EmployeeService } from '../../../../../shared/employee.service';
import { ISelect } from '../../../../../interfaces/IProfile';

@Component({
    templateUrl: './addCountryName.component.html'
})

export class AddCountry implements OnInit {
    countryForm: FormGroup;
    sendData: ISelect;

    constructor(
        private employeeService: EmployeeService,
        private fb: FormBuilder,
        private dialogRef:MatDialogRef<AddCountry>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }


    ngOnInit() {
        this.countryForm = this.fb.group({
            id: '',
            name: ''
        });

        if (this.data) {
            this.patchValue(this.data);
        }
    }

    patchValue(d: ISelect): void {
        if (!d) return;
        this.countryForm.patchValue({
            id: d.id,
            name: d.name,
        });

    }

    save() {
        this.sendData = this.countryForm.value;
        this.dialogRef.close();
    }

}