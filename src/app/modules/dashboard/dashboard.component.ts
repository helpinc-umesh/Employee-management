import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    private readonly toDestroy$ = new Subject<void>();

    searchForm: FormGroup;

    constructor(
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder
    ) { }

    ngOnInit() { }

    ngOnDestroy() {
        this.toDestroy$.next();
        this.toDestroy$.complete();
    }
}
