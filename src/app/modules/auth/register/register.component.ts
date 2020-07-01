import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GenericValidator } from '../../shared/validations/generic-validators';
import { ChangesConfirmComponent } from '../../shared/changes-confirm/changes-confirm.component';
import { AuthService } from '../auth.service';

@Component({
    templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly toDestroy$ = new Subject<void>();

    registerForm: FormGroup;

    genericValidator: GenericValidator;
    @ViewChildren(FormControlName, { read: ElementRef })
    private formInputElements: ElementRef[];
    displayMessage: any;

    constructor(
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder,
        private authService: AuthService,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<RegisterComponent>
    ) {
        this.genericValidator = new GenericValidator({
            name: {
                required: 'This field is required.'
            }
        });
    }

    ngOnInit() {
        this.initForm();
    }

    private initForm() {
        this.registerForm = this.fb.group({
            id: 0,
            name: null,
            email: null,
            gender: null,
            country: null,
            address: null,
            contactNo: null,
            status: null,
            description: null,
        });
    }

    private patchForm(d: any) {
        this.registerForm.patchValue({
            id: d.id,
            name: d.name,
            email: d.email,
            gender: d.gender,
            country: d.country,
            contactNo: d.contactNo,
            status: d.status,
            description: d.description
        });
    }

    saveChanges() {
        console.log(this.registerForm.value);
    }


    cancel() {
        if (this.registerForm.dirty) {
            this.dialog.open(ChangesConfirmComponent).afterClosed()
                .pipe(
                    filter(_ => _)
                ).subscribe(_ => this.dialogRef.close());
        } else {
            this.dialogRef.close();
        }

    }

    ngAfterViewInit() {
        this.validation();

        let d: any;
        this.patchForm(d);
    }

    private validation() {
        this.genericValidator
            .initValidationProcess(this.registerForm, this.formInputElements)
            .subscribe({ next: m => this.displayMessage = m });
    }

    ngOnDestroy() {
        this.toDestroy$.next();
        this.toDestroy$.complete();
    }
}
