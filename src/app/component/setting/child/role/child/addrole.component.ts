import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA ,MatDialogRef } from '@angular/material';

import {ISelect} from '../../../../../interfaces/IProfile';

@Component({
    templateUrl: './addrole.component.html'
})

export class AddRoleComponent implements OnInit {
    roleForm: FormGroup;
    sendData:ISelect;

    constructor(private fb: FormBuilder, private dialogRef:MatDialogRef<AddRoleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.roleForm = this.fb.group({
            id:[],
            name:''
        });
        if (this.data) {
            this.patchValue(this.data);
        }
    }

    patchValue(d: ISelect): void {
        if (!d) return;
        this.roleForm.patchValue({
            id: d.id,
            name: d.name,
        });

    }

    save() {
        this.sendData = this.roleForm.value;
        this.dialogRef.close();
    }
}