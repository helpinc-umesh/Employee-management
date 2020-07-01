import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog , MatDialogRef } from '@angular/material';

import { IProfile } from '../../interfaces/IProfile';
import { EmployeeService } from '../../shared/employee.service';
import { ForgotPasswordComponent } from '../login/child/forgot-password.component';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.style.css']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  dialogRef:MatDialogRef<ForgotPasswordComponent>; // To Open forgot password componnt

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService,
    public dialog:MatDialog
  ) {}


  forgotPassword() {
    this.dialogRef = this.dialog.open(ForgotPasswordComponent,{
      height:'190px',
      width:'40%'
    });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.loginForm.value;
    // Compare form value email,Password and Repository data email, password to login.
    let el = this.employeeService.employee(this.loginForm.value.email, this.loginForm.value.password);
    if (!el) return;
    this.employeeService.users = el.email;// To send logged user data 
    this.router.navigate(['/my/profile']);
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}

