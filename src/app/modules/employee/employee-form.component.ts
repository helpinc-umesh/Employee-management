import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, FormControlName } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { GenericValidator } from '../shared/validations/generic-validators';
import { ChangesConfirmComponent } from '../shared/changes-confirm/changes-confirm.component';
import { filter } from 'rxjs/operators';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
    templateUrl: './employee-form.component.html',
    styleUrls: ['./employee.scss']
})
export class EmployeeFormComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly toDestroy$ = new Subject<null>();

    employeeForm: FormGroup;
    displayMessage: any = {};
    genericValidator: GenericValidator;
    @ViewChildren(FormControlName, { read: ElementRef })
    private formInputElements: ElementRef[];

    constructor(
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<EmployeeFormComponent>,
        private employeeService: EmployeeService
    ) {
        this.genericValidator = new GenericValidator({

        });
    }

    ngOnInit() {
        this.initForm();
     }

    private initForm() {
        this.employeeForm = this.fb.group({
            id: 0,
            firstName: null,
            lastName: null,
            address: null,
            contact: null,
            email: null,
        });
    }

    private patchForm(d: any) {
        this.employeeForm.patchValue({
            id: d.id,
            firstName: d.firstName,
            lastName: d.lastName,
            address: d.address,
            contact: d.contact,
            email: d.email
        });
    }

    cancel() {
        if (this.employeeForm.dirty) {
            this.dialog.open(ChangesConfirmComponent).afterClosed()
                .pipe(
                    filter(_ => _)
                ).subscribe(_ => this.dialogRef.close());
        } else {
            this.dialogRef.close();
        }

    }

    saveChanges() {

    }

    ngAfterViewInit() {
        this.genericValidator
            .initValidationProcess(this.employeeForm, this.formInputElements)
            .subscribe({ next: m => this.displayMessage = m });
    }

    ngOnDestroy() {
        this.toDestroy$.next();
        this.toDestroy$.complete();
    }
}
