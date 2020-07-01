import { Pipe, PipeTransform, Injectable } from '@angular/core';

import { IProfile } from '../interfaces/IProfile';

@Pipe({
    name: 'filter'
})

export class EmployeeFilterPipe {
    transform(filterBy: IProfile[], filtered: string): IProfile[] {
        return filtered ? filterBy
            .filter(data => data.firstName.toLocaleLowerCase()
                .indexOf(filtered) > -1) : filterBy;
    }
}