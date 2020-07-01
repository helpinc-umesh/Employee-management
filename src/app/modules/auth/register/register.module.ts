import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangesConfirmModule } from '../../shared/changes-confirm/changes-confirm.module';
import { DeleteConfirmModule } from '../../shared/delete-confirm/delete-confirm.module';
import { AuthService } from '../auth.service';
import { MatSelectModule } from '@angular/material/select';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

@NgModule({
    declarations: [RegisterComponent],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule, MatInputModule, MatDialogModule, MatSelectModule,
        RouterModule.forChild([
            {
                path: '', component: RegisterComponent
            }
        ]), ChangesConfirmModule, DeleteConfirmModule, MatBottomSheetModule
    ],
    exports: [],
    providers: [AuthService],
})
export class RegisterModule { }
