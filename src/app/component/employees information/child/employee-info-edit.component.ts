import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray , FormControl} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { MatSelect } from '@angular/material';
import { Subject, Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IProfile, ISelect } from '../../../interfaces/IProfile';
import { EmployeeService } from '../../../shared/employee.service';

@Component({
    templateUrl: './employee-info-edit.component.html',
})

export class EmployeeInfoEditComponent implements OnInit {
    employeeEditInfoForm: FormGroup;
    sendData: IProfile;
    countryName: ISelect[] = [];
    colorName: ISelect[] = [];
    QUALIFICATION: ISelect[] = [];
    ROLE: ISelect[] = [];
    GENDER: ISelect[] = [];
    constructor(
        private employeeService: EmployeeService,
        private dialogRef: MatDialogRef<EmployeeInfoEditComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any) { } // Inject Data Form ViewComponent

    // For Single Selection with Search input
    countryFilterCtrl: FormControl = new FormControl();
    filteredCountries: ReplaySubject<ISelect[]> = new ReplaySubject<ISelect[]>();
    // For Multiple Selection...
    colorFilterCtrl: FormControl = new FormControl();
    filteredColor: ReplaySubject<ISelect[]> = new ReplaySubject<ISelect[]>();

    // Mat Select DropDowns..
    Qualification: ReplaySubject<ISelect[]> = new ReplaySubject<ISelect[]>();
    Role: ReplaySubject<ISelect[]> = new ReplaySubject<ISelect[]>();
    Gender: ReplaySubject<ISelect[]> = new ReplaySubject<ISelect[]>();

    private _onDestroy = new Subject<void>();

    ngOnInit(): void {
        this.employeeEditInfoForm = this.fb.group({
            id: [],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            password: ['', Validators.required],
            gender: ['', Validators.required],
            qualification: ['', Validators.required],
            dateofbirth: ['', Validators.required],
            address: ['', Validators.required],
            // Make addresses FormArray 
            addresses: this.fb.array([]),
            status: ['', Validators.required],
            country: ['', Validators.required],
            color: ['', Validators.required],
            role: ['', Validators.required]
        });
        if (this.data) {
            this.patchValue(this.data);
        }
        // Data from Repository.
        this.employeeService.countries().subscribe(data => this.countryName = data);
        this.employeeService.color().subscribe(data => this.colorName = data);

        this.employeeService.qualification().subscribe(data => this.QUALIFICATION = data);
        // this.ROLE = this.employeeService.Role();
        this.employeeService.Role().subscribe(data => this.ROLE = data);
        this.GENDER = this.employeeService.Gender();

        // Single Selection.. For Countries
        this.filteredCountries.next(this.countryName.slice());
        this.countryFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy)).subscribe(() => { this.filterCountry(); });

        // Multiple Selection.. For Color..
        this.filteredColor.next(this.colorName.slice());
        this.colorFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy)).subscribe(() => { this.filterColor(); });

            // Mat Selection 
        this.Qualification.next(this.QUALIFICATION.slice());
        this.Role.next(this.ROLE.slice());
        this.Gender.next(this.GENDER.slice());
    }

    // Make FormArray of addresses // addresses = Property
    get addresses(): FormArray {
        return <FormArray>this.employeeEditInfoForm.get('addresses');
    }

    // add() {
    //     let array = <FormArray>this.employeeEditInfoForm.get('addresses');
    //     array.push(this.fb.group({
    //         addresses: null
    //     }));
    // }

    // Add Another Input
    addother() {
        this.addresses.push(new FormControl);
    }

    // Remove added input
    removeArray(index: number) {
        let array = <FormArray>this.employeeEditInfoForm.get('addresses');
        array.removeAt(index);
    }

    save() {
        this.sendData = this.employeeEditInfoForm.value;
        // get formArray from the parent form
        const adress = <FormArray>this.employeeEditInfoForm.get('addresses');
        // map values form  child form array control
        const output = adress.controls.map(x => <string>x.value);
        // asign value to post
        this.sendData.addresses = output;
        this.dialogRef.close();
    }

    patchValue(d: IProfile): void {
        if (!d) return;
        this.employeeEditInfoForm.patchValue({
            id: d.id,
            firstName: d.firstName,
            lastName: d.lastName,
            email: d.email,
            password: d.password,
            gender: d.gender,
            qualification: d.qualification,
            dateofbirth: d.dateofbirth,
            address: [d.address,],
            status: d.status,
            country: d.country,
            color: d.color,
            role: d.role
        });
       // make new FormControl and Patch the added input  Value 
        d.addresses.forEach(val => {
            this.addresses.push(new FormControl(val));
        });
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    // Filter color.. 
    filterColor() {
        if (!this.colorName) {
            return;
        }
        let search = this.colorFilterCtrl.value;
        if (!search) {
            this.filteredColor.next(this.colorName.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        this.filteredColor.next(this.colorName.filter(color => color.name.toLowerCase()
            .indexOf(search) > -1));
    }

    // Filter Color..
    filterCountry() {
        if (!this.countryName) {
            return;
        }
        let search = this.countryFilterCtrl.value;
        if (!search) {
            this.filteredCountries.next(this.countryName.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        this.filteredCountries.next(this.countryName.filter(country => country.name.toLowerCase()
            .indexOf(search) > -1));
    }

    cancel() {
        this.dialogRef.close();
    }

}
