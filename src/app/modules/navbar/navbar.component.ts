import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'nav-bar',
    templateUrl: './navbar-component.html',
    styleUrls: ['./navbar.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
    private readonly toDestroy$ = new Subject<null>();

    constructor() { }

    ngOnInit() { }


    ngOnDestroy() {
        this.toDestroy$.next();
        this.toDestroy$.complete();
    }
}
