import { Component , OnInit , Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { ISelect } from '../../../../../interfaces/IProfile';

@Component({
    templateUrl: './addcolor.component.html'
})

export class AddColorComponent implements OnInit {
    colorForm: FormGroup;
    sendData:ISelect;

    constructor(private fb:FormBuilder
    ,private dialogRef:MatDialogRef<AddColorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    ngOnInit() {
        this.colorForm = this.fb.group({
            id:[],
            name:''
        });
        if (this.data) {
            this.patchValue(this.data);
        }
    }

    patchValue(d: ISelect): void {
        if (!d) return;
        this.colorForm.patchValue({
            id: d.id,
            name: d.name,
        });

    }

    save() {
        this.sendData = this.colorForm.value;
        this.dialogRef.close();
    }
}