import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class EmployeeService {

    getList(): Observable<any> {
        return of(DATA);
    }

    delete(id: number): Observable<any> {
        let i = DATA.findIndex(_ => _.id === id);
        DATA.splice(i, 1);
        return of(DATA);
    }

    getListById(id: number): Observable<any> {
        let data = DATA.find(_ => _.id === id);
        return of(data);
    }
}

let DATA = []