import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    templateUrl: './confirmDelete.component.html',
})

export class ConfirmDeleteComponent {

    constructor(private deleteDialogRef: MatDialogRef<ConfirmDeleteComponent>) {}

    yes() {
        this.deleteDialogRef.close(true);
    }

    no() {
        this.deleteDialogRef.close(false);
    }

}