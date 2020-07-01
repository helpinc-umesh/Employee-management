import { Component, OnInit ,Inject } from '@angular/core';
import { FormGroup , FormBuilder , FormControl } from '@angular/forms';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material';

import { ISelect } from '../../../../../interfaces/IProfile';

@Component({
    templateUrl: './addQualification.component.html'
})

export class AddQualification implements OnInit {
    qualificationForm:FormGroup;
    sendData:ISelect;

    constructor(private fb:FormBuilder, private dialogRef:MatDialogRef<AddQualification>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}


    ngOnInit() {
        this.qualificationForm = this.fb.group({
            id:[],
            name:''
        });
        if (this.data) {
            this.patchValue(this.data);
        }
    }

    patchValue(d: ISelect): void {
        if (!d) return;
        this.qualificationForm.patchValue({
            id: d.id,
            name: d.name,
        });

    }

    save() {
        this.sendData = this.qualificationForm.value;
        this.dialogRef.close();
    }
}