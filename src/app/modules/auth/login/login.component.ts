import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, FormControlName } from '@angular/forms';
import { GenericValidator } from '../../shared/validations/generic-validators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChangesConfirmComponent } from '../../shared/changes-confirm/changes-confirm.component';
import { filter } from 'rxjs/operators';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly toDestroy$ = new Subject<void>();

    loginForm: FormGroup;
    genericValidator: GenericValidator;
    @ViewChildren(FormControlName, { read: ElementRef })
    private formInputElements: ElementRef[];
    displayMessage: any;

    constructor(
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<LoginComponent>
    ) {
        this.genericValidator = new GenericValidator({

        });
    }

    ngOnInit() {
        this.initForm();
    }

    private initForm() {
        this.loginForm = this.fb.group({
            id: null,
            userName: null,
            password: null
        });
    }

    ngAfterViewInit() {
        this.validation();
    }

    private validation() {
        this.genericValidator
            .initValidationProcess(this.loginForm, this.formInputElements)
            .subscribe({ next: m => this.displayMessage = m });
    }

    cancel() {
        if (this.loginForm.dirty) {
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

    ngOnDestroy() {
        this.toDestroy$.next();
        this.toDestroy$.complete();
    }
}
