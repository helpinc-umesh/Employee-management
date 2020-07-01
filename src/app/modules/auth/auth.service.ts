import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthService {

    getList(): Observable<any> {
        return of(DATA);
    }

    getListById(id: number): Observable<any> {
        let data = DATA.find(_ => _.id === id);
        return of(data);
    }

    deleteListById(id: number): Observable<any> {
        let index = DATA.findIndex(_ => _.id === id);
        DATA.splice(index, 1);
        return of(DATA);
    }

    addOrUpdate(body: any): Observable<any> {
        if (body.id >= 1) {
            let d = DATA.find(_ => _.id === body.id);
            let i = DATA.findIndex(_ => _.id === body.id);
            DATA[i] = body;
            body.id = d.id;
            return of(body);
        } else {
            let d = DATA.find(_ => _.id === body.id);
            DATA.push(body);
            body.id = d.id;
            return of(body);
        }
    }

}

let DATA = [

];
