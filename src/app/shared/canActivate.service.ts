import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { EmployeeService } from '../shared/employee.service';

@Injectable()

export class Activate {

    constructor
        (
        private employeeService: EmployeeService,
        private router: Router
        ) { }

    canActivate() {
        if (this.employeeService.currentUser)
            return true;
        else {
            alert('There is no Data "Login First!!"');
            this.router.navigate(['/login']);

        }
    }

}