import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';

import { MyProfile } from './my-profile.component';
import { ConfirmDeleteComponent } from './child/confirmDelete.component';
import { Activate } from '../../shared/canActivate.service';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, FormsModule,MatDialogModule,
        RouterModule.forChild([
            { path: '', canActivate: [Activate], component: MyProfile },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
        ])
    ],
    declarations: [MyProfile],
    providers: [Activate],
    entryComponents: []

})
export class MyProfileModule { }