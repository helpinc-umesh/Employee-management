import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';

import { LogInComponent } from '../login/login.component';
import { ForgotPasswordComponent } from '../login/child/forgot-password.component';


@NgModule({
    imports: [CommonModule,MatDialogModule,
        FormsModule, ReactiveFormsModule,
        RouterModule.forChild([
            {path:'',component:LogInComponent}
        ])
    ],
    declarations: [
        LogInComponent, ForgotPasswordComponent
    ],
    providers: [],
    entryComponents: [ForgotPasswordComponent]

})
export class LoginModule { }
