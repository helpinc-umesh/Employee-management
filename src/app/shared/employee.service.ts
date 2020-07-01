import { Injectable, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, Sort } from '@angular/material';

import { IProfile, ISelect } from '../interfaces/IProfile';
import { ConfirmDeleteComponent } from '../component/my-profile/child/confirmDelete.component';
import { range, of, Observable, observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';

@Injectable()
export class EmployeeService {
    users: string;
    currentUser: boolean;
    myData: IProfile;
    select: number[];
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    // Delete data from Repository..TableComponent.
    deleteRows() {
        let data = Repository;
        range(0, this.select.length)// Delete data start ,end
            .pipe(
                map(delIndex => data.findIndex(x => x.id === this.select[delIndex])),
                filter(index => index > -1)
            )
            .subscribe(index => {
                data.splice(index, 1);
            });
    }



    // Send Repository's data length to employeeInfoComponent..
    length() {
        let data = Repository.length;
        return data;
    }

    // send Repository data on Component according to their role...
    employeeinfo(): Observable<IProfile[]> {
        // if (!this.users) return Observable.empty();
        // let element = Repository.find(x => x.email === this.users);
        // let user = Repository.filter(x => x.role === element.role);
        // let us = Repository.filter(x => x.role === 'user' || x.role === 'manager');
        // if (element.role === 'admin')
        let data = Repository.slice(0, 5);
        return of(data);
        // else if (element.role === 'manager') {
        //     return Observable.of(us);
        // } else
        //     return Observable.of(user);
    }


    // Edit My profile Data
    onEdit(body: IProfile) {
        let i = Repository.findIndex(x => x.id === body.id);
        Repository[i] = body;
        return of(body);
    }

    // Edit data on Table 
    onEditTable(body: IProfile): Observable<boolean> {
        let i = Repository.findIndex(x => x.id === body.id);
        Repository[i] = body;
        return of(true);
    }

    // Another Option edit data on table..
    onEdits(data: IProfile): Observable<IProfile> {
        data.id = data.id > 0 ? data.id : Math.max(...Repository.map(i => i.id)) + 1;
        let i = Repository.findIndex(x => x.id === data.id);
        if (i > -1) {
            Repository[i] = data;
        } else {
            Repository.push(data);
        }
        return of(data);
    }

    // Send data to MyComponent who logged in
    get(): Observable<IProfile> {
        let element = Repository.find(x => x.email === this.users); // Compare logged user and Repository data and return logged user data
        return of(element);
    }

    // login Only registered user
    employee(email: string, password: string) {
        let el = Repository.find(x => x.email === email && x.password === password);
        this.currentUser = el && el.id > 0;
        if (!el) {
            alert('Invalid User!!');
        }
        return el;
    }

    // New user register
    register(user: any) {
        let max = Math.max(...Repository.map(x => x.id));
        user.id = max + 1;
        Repository.push(user);
        return Repository;
    }
    // Delete user only who logged..
    onDelete(id: number) {
        let copy = Repository.slice();
        let index = copy.findIndex(x => x.id === id);
        if (index > -1) {
            copy.splice(index, 1);
        }
        Repository = copy;
    }
    // Sorting data on table..
    getSorted(sort: Sort, start: number, end: number, filtered?: string): Observable<IProfile[]> {
        let getFiltered = filtered ? Repository.filter(x => x.firstName.toLowerCase().includes(filtered.toLocaleLowerCase())) : Repository;
        if (!sort.active)
            return of(getFiltered.slice(start, end));

        let d = getFiltered.sort((a, b) => {
            if (sort.direction === '') {
                return compare(a.id, b.id, true);
            }

            let isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'name': return compare(a.firstName, b.firstName, isAsc);
                case 'id': return compare(a.id, b.id, isAsc);
                case 'email': return compare(a.email, b.email, isAsc);
                case 'gender': return compare(a.gender, b.gender, isAsc);
                case 'role': return compare(a.role, b.role, isAsc);
            }
        });

        return of(d.slice(start, end));
    }

    Gender() {
        return GENDER;
    }
    Role():Observable<ISelect[]> {
        let d = ROLE;
        return of(d);
    }

    onRoleTable(body: ISelect): Observable<boolean> {
        let i = ROLE.findIndex(x => x.id === body.id);
        ROLE[i] = body;
        return of(true);
    }

    addRole(a:any) {
        let max = Math.max(...ROLE.map(x => x.id));
        a.id = max + 1;
        ROLE.push(a);
        return ROLE;
    }

    qualification():Observable<ISelect[]> {
        let d = QUALIFICATION;
        return of(d);
    }

    onQualificationTable(body: ISelect): Observable<boolean> {
        let i = QUALIFICATION.findIndex(x => x.id === body.id);
        QUALIFICATION[i] = body;
        return of(true);
    }

    addQualification(a:any) {
        let max = Math.max(...QUALIFICATION.map(x => x.id));
        a.id = max + 1;
        QUALIFICATION.push(a);
        return QUALIFICATION;
    }

    // send countries Name in table
    countries(): Observable<ISelect[]> {
        let d = COUNTRY;
        return of(d);
    }

    onCountryTable(body: ISelect): Observable<boolean> {
        let i = COUNTRY.findIndex(x => x.id === body.id);
        COUNTRY[i] = body;
        return of(true);
    }
    addCountry(a:any) {
        let max = Math.max(...COUNTRY.map(x => x.id));
        a.id = max + 1;
        COUNTRY.push(a);
        return COUNTRY;
    }

    color():Observable<ISelect[]> {
        let d = COLOR;
        return of(COLOR);
    }

    onColorTable(body: ISelect): Observable<boolean> {
        let i = COLOR.findIndex(x => x.id === body.id);
        COLOR[i] = body;
        return of(true);
    }
    addColor(a:any) {
        let max = Math.max(...COLOR.map(x => x.id));
        a.id = max + 1;
        COLOR.push(a);
        return COLOR;
    }

    // Delete Setting Color List
    deleteRole() {
        let data = COLOR;
        range(0, this.select.length).pipe(
            map(delIndex => data.findIndex(x => x.id === this.select[delIndex])),
            filter(index => index > -1)
        ).subscribe(index => {
            data.splice(index, 1);
        });
    }

    // Delete Setting Country List
    deleteCountry() {
        let data = COUNTRY;
        range(0, this.select.length).pipe(
            map(delIndex => data.findIndex(x => x.id === this.select[delIndex])),
            filter(index => index > -1)
        ).subscribe(index => {
            data.splice(index, 1);
        });
    }
}
function compare(a: any, b: any, isAsc: any) {
    let value = (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    return value;
}


let Repository = [
    {
        id: 1,
        firstName: 'a',
        lastName: 'a',
        email: 'a',
        password: 'a',
        gender: 'Male',
        qualification: 'Degree',
        dateofbirth: '1990/02/10',
        address: 'Kapan',
        status: 1,
        country: 'Nepal',
        color: ['Pink'],
        role: 'admin',
        addresses: ['asd', '12']
    },
    {
        id: 2,
        firstName: 'c',
        lastName: 'Pandey',
        email: 'ram@gmail.com',
        password: '12345',
        gender: 'Male',
        qualification: 'See',
        dateofbirth: '1970/02/10',
        address: 'Pokhera',
        status: 2,
        country: 'India',
        color: ['White', 'Black', 'Green'],
        role: 'manager',
        addresses: ['14']
    },
    {
        id: 3,
        firstName: 'b',
        lastName: 'Tamang',
        email: 'fas@gmail.com',
        password: '12345',
        gender: 'Male',
        qualification: '+2',
        dateofbirth: '1980/02/10',
        address: 'Delhi',
        status: 3,
        country: 'India',
        color: ['Green'],
        role: 'manager',
        addresses: ['1', 'fas']
    },

    {
        id: 4,
        firstName: 'd',
        lastName: 'Subedi',
        email: 'hari@gmail.com',
        password: '12345',
        gender: 'Male',
        qualification: 'Bachelor',
        dateofbirth: '1960/02/10',
        address: 'Bhaktpur',
        status: 4,
        country: 'South Korea',
        color: ['Pink', 'Purple', 'White', 'Red'],
        role: 'user',

        addresses: ['']
    },
    {
        id: 5,
        firstName: 'e',
        lastName: 'Bona',
        email: 'asds@gmail.com',
        password: '12345',
        gender: 'Female',
        qualification: 'B.A',
        dateofbirth: '1960/02/10',
        address: 'Bharatpur',
        status: 1,
        country: 'China',
        color: ['White'],
        role: 'user',
        addresses: ['']
    },
    {
        id: 6,
        firstName: 'f',
        lastName: 'Nondg',
        email: 'asd@gmail.com',
        password: '12345',
        gender: 'Male',
        qualification: 'CSIT',
        dateofbirth: '1960/02/10',
        address: 'Asdop',
        status: 2,
        country: 'Nepal',
        color: ['Black', 'Red'],
        role: 'user',
        addresses: ['']
    },
    {
        id: 7,
        firstName: 'g',
        lastName: 'Biyo',
        email: 'shyam@gmail.com',
        password: '12345',
        gender: 'Female',
        qualification: 'Degree',
        dateofbirth: '1960/02/10',
        address: 'Cmosao',
        status: 3,
        country: 'Japan',
        color: ['Green', 'Yellow'],
        role: 'user',
        addresses: ['']
    },
    {
        id: 8,
        firstName: 'h',
        lastName: 'leo',
        email: 'shyamasd@gmail.com',
        password: '12345',
        gender: 'Male',
        qualification: 'Madassters',
        dateofbirth: '1960/02/10',
        address: 'Heaada',
        status: 4,
        country: 'Nepal',
        color: ['Green', 'White', 'Pink'],
        role: 'manager',

        addresses: ['']
    },
    {
        id: 9,
        firstName: 'i',
        lastName: 'Kaosg',
        email: 'shyam@gmail.com',
        password: '12345',
        gender: 'Female',
        qualification: 'Bachelor',
        dateofbirth: '1960/02/10',
        address: 'Bhaktpur',
        status: 1,
        country: 'Nepal',
        color: ['Green', 'Purple'],
        role: 'manager',

        addresses: ['']
    },
    {
        id: 10,
        firstName: 'j',
        lastName: 'hhehdhdha',
        email: 'sasdm@gmail.com',
        password: '12345',
        gender: 'Male',
        qualification: '+2',
        dateofbirth: '1960/02/10',
        address: 'Mansald',
        status: 2,
        country: 'Germany',
        color: ['Black', 'Red'],
        role: 'user',

        addresses: ['']
    },
    {
        id: 11,
        firstName: 'k',
        lastName: 'asdfafaafwaa',
        email: 'shyam@gmail.com',
        password: '12345',
        gender: 'Female',
        qualification: 'See',
        dateofbirth: '1960/02/10',
        address: 'Bhaktpur',
        status: 3,
        country: 'India',
        color: ['Green', 'Red'],
        role: 'user',
        addresses: ['']
    },

    {
        id: 12,
        firstName: 'c',
        lastName: 'Pandey',
        email: 'ram@gmail.com',
        password: '12345',
        gender: 'Male',
        qualification: '+2',
        dateofbirth: '1970/02/10',
        address: 'Pokhera',
        status: 4,
        country: 'Japan',
        color: ['Green', 'Blue'],
        role: 'manager',
        addresses: ['']
    },
    {
        id: 13,
        firstName: 'b',
        lastName: 'Tamang',
        email: 'fas@gmail.com',
        password: '12345',
        gender: 'Male',
        qualification: '+2',
        dateofbirth: '1980/02/10',
        address: 'Okhldhunga',
        status: 1,
        country: 'Nepal',
        color: ['Green', 'White', 'Blue'],
        role: 'manager',

        addresses: ['']
    },

    {
        id: 14,
        firstName: 'd',
        lastName: 'Subedi',
        email: 'hari@gmail.com',
        password: '12345',
        gender: 'Male',
        qualification: 'Bachelor',
        dateofbirth: '1960/02/10',
        address: 'Bhaktpur',
        status: 2,
        country: 'Nepal',
        color: ['Green'],
        role: 'user',

        addresses: ['']
    },
    {
        id: 15,
        firstName: 'e',
        lastName: 'Bona',
        email: 'asds@gmail.com',
        password: '12345',
        gender: 'Female',
        qualification: '+2',
        dateofbirth: '1960/02/10',
        address: 'Kaski',
        status: 3,
        country: 'Nepal',
        color: ['Green', 'Black', 'Pink'],
        role: 'manager',

        addresses: ['']
    },
    {
        id: 16,
        firstName: 'f',
        lastName: 'Nondg',
        email: 'asd@gmail.com',
        password: '12345',
        gender: 'Male',
        qualification: 'Bachelor',
        dateofbirth: '1960/02/10',
        address: 'Lalitpur',
        status: 4,
        country: 'Bhutan',
        color: ['Green', 'Yellow', 'Blue'],
        role: 'user',

        addresses: ['']
    },
    {
        id: 17,
        firstName: 'g',
        lastName: 'Biyo',
        email: 'shyam@gmail.com',
        password: '12345',
        gender: 'Female',
        qualification: 'CSIT',
        dateofbirth: '1960/02/10',
        address: 'Z way',
        status: 1,
        country: 'North Korea',
        color: ['Green', 'Red', 'Purple'],
        role: 'user',

        addresses: ['']
    },
    {
        id: 18,
        firstName: 'h',
        lastName: 'leo',
        email: 'shyamasd@gmail.com',
        password: '12345',
        gender: 'Male',
        qualification: '+2',
        dateofbirth: '1960/02/10',
        address: 'Dang',
        status: 2,
        country: 'Russia',
        color: ['Green', 'White'],
        role: 'manager',

        addresses: ['']
    },
    {
        id: 19,
        firstName: 'i',
        lastName: 'Kaosg',
        email: 'shyam@gmail.com',
        password: '12345',
        gender: 'Female',
        qualification: 'See',
        dateofbirth: '1960/02/10',
        address: 'Bhaktpur',
        status: 3,
        country: 'Canada',
        color: ['Black'],
        role: 'manager',

        addresses: ['']
    },
    {
        id: 20,
        firstName: 'j',
        lastName: 'hhehdhdha',
        email: 'sasdm@gmail.com',
        password: '12345',
        gender: 'Male',
        qualification: 'Bachelor',
        dateofbirth: '1960/02/10',
        address: 'Gopa',
        status: 4,
        country: 'Nepal',
        color: ['Purple', 'Pink'],
        role: 'user',

        addresses: ['']
    },
    {
        id: 21,
        firstName: 'k',
        lastName: 'asdfafaafwaa',
        email: 'shyam@gmail.com',
        password: '12345',
        gender: 'Female',
        qualification: '+2',
        dateofbirth: '1960/02/10',
        address: 'Bhaktpur',
        status: 1,
        country: 'Nepal',
        color: ['Green', 'Blue', 'Red'],
        role: 'manager',

        addresses: ['']
    },
    {
        id: 22,
        firstName: 'k',
        lastName: 'asdfafaafwaa',
        email: 'shyam@gmail.com',
        password: '12345',
        gender: 'Female',
        qualification: 'Bachelor',
        dateofbirth: '1960/02/10',
        address: 'Kathmandu',
        status: 2,
        country: 'Bangladesh',
        color: ['Green', 'Yellow'],
        role: 'user',

        addresses: ['']
    },
];

let COUNTRY = [
    { name: 'Nepal', id: 1 },
    { name: 'China', id: 2 },
    { name: 'Bangladesh', id: 3 },
    { name: 'France', id: 4 },
    { name: 'USA', id: 5 },
    { name: 'Italy', id: 6 },
    { name: 'Germany', id: 7 },
    { name: 'UK', id: 8 },
    { name: 'Russia', id: 9 },
    { name: 'Canada', id: 10 },
    { name: 'India', id: 11 },
    { name: 'Bhutan', id: 12 },
    { name: 'Finland', id: 13 },
];

let COLOR = [
    { name: 'red', id: 1 },
    { name: 'Green', id: 2 },
    { name: 'Blue', id: 3 },
    { name: 'Yellow', id: 4 },
    { name: 'White', id: 5 },
    { name: 'Black', id: 6 },
    { name: 'Pink', id: 7 },
    { name: 'Purple', id: 8 },
];
let QUALIFICATION = [
    { name: 'See', id: 1 },
    { name: '+2', id: 2 },
    { name: 'Bachelor', id: 3 },
    { name: 'MBA', id: 4 },
    { name: 'B.A', id: 5 },
    { name: 'CSIT', id: 6 },
    { name: 'Degree', id: 7 },
    { name: 'Masters', id: 8 },
];
let ROLE = [
    { name: 'admin', id: 1 },
    { name: 'user', id: 2 },
    { name: 'manager', id: 3 },
];
let GENDER = [
    { name: 'Male', id: 1 },
    { name: 'Female', id: 2 },
    { name: 'Other', id: 3 },
];
