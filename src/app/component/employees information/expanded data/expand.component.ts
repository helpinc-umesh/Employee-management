import { Component, Input } from '@angular/core';

import { IProfile } from '../../../interfaces/IProfile';

@Component({
    templateUrl: './expand.component.html',
    styles: [`
    
    .font{
        font-size:18px;
    }
    `]
})
export class ExpandComponent {
    // Input data from employeeInfoComponent
    @Input() childData: IProfile;

}