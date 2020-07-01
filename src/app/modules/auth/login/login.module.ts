import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: LoginComponent }
        ]), FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule
    ],
    exports: [],
    providers: [AuthService],
})
export class LoginModule { }
