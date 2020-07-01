import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    templateUrl: './forgot-password.component.html'
})

export class ForgotPasswordComponent {
    forgotForm: FormGroup;
    constructor(private fb: FormBuilder,
        private dialogRef: MatDialogRef<ForgotPasswordComponent>) { }


    ngOnInit() {
        this.forgotForm = this.fb.group({
            email: ['', [Validators.required]],
        });

    }

    submit() {
        this.dialogRef.close();
    }
}