import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import {RouterModule } from '@angular/router';

import { ContactUsComponent } from './contact-us.component';


@NgModule({
    imports:[CommonModule,
    RouterModule.forChild([
        { path: '', component: ContactUsComponent },
        { path: '', redirectTo: 'home', pathMatch: 'full' },
    ])
],
    declarations:[ContactUsComponent],
    providers:[],
})
export class ContactusModule {}