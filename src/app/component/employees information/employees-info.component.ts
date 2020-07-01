import {
    Component, ViewChild, OnInit, AfterViewInit,
    ComponentFactoryResolver, ComponentFactory, ViewChildren,
    ViewContainerRef, QueryList, Renderer2
} from '@angular/core';
import {
    MatTableDataSource, MatSort, MatPaginator,
    MatDialog, MatDialogRef, Sort, MatSelect
} from '@angular/material';
import { range, of, merge } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { filter, map, delay, delayWhen, flatMap } from 'rxjs/operators';

import { IProfile } from '../../interfaces/IProfile';
import { EmployeeService } from '../../shared/employee.service';
import { EmployeeInfoEditComponent } from '../../component/employees information/child/employee-info-edit.component';
import { ConfirmDeleteComponent } from '../../component/my-profile/child/confirmDelete.component';
import { ExpandComponent } from '../employees information/expanded data/expand.component';


@Component({
    templateUrl: './employees-info.component.html',
    styles: [`
    .example-container {
      display: flex;
      flex-direction: column;
      min-width: 300px;}
    
    .example-header {
      min-height: 64px;
      padding: 8px 24px 0;}
    
    .mat-form-field {
      font-size: 14px;
      width: 100%;}
    
    .mat-table {
      overflow: auto;
      max-height: 500px;}
    
  `]
})
export class EmployeeInfoComponent implements AfterViewInit, OnInit {
    displayedColumns = ['details', 'checkbox', 'id', 'name', 'email', 'password', 'qualification', 'dateofbirth', 'address', 'gender', 'country', 'color', 'status', 'role', 'edit'];// Table Heading
    dataSource = new MatTableDataSource<IProfile>([]);
    dialogRef: MatDialogRef<EmployeeInfoEditComponent>; // To Open dialog to edit or add Data.
    confirmDelete: MatDialogRef<ConfirmDeleteComponent>; // To Open dialog to Conformation
    selection = new SelectionModel<number>(true, []);

    length = this.employeeService.length();
    pageSize = 5;
    pageSizeOptions = [5, 10, 15, 20];
    expandedRow: number;

    // Sorting List 
    @ViewChild(MatSort) sort: MatSort;
    // paging the list
    @ViewChild(MatPaginator) paginator: MatPaginator;

    // To show expand Component on list
    // cdkrow is used in mat-row to show expand component on the buttom of list which we clicked..
    @ViewChildren('cdkrow', { read: ViewContainerRef })
    private containers: QueryList<ViewContainerRef>;

    constructor(
        private employeeService: EmployeeService,
        public dialog: MatDialog,
        private resolver: ComponentFactoryResolver,
        // private renderer: Renderer2
    ) { }

    // Expand User Details
    expandRow(index: number) {
        if (this.expandedRow != null) {
            this.containers.toArray()[this.expandedRow].clear();
        }
        if (this.expandedRow === index) {
            this.expandedRow = null;
        } else {
            const container = this.containers.toArray()[index];
            const factory: ComponentFactory<ExpandComponent> = this.resolver.resolveComponentFactory(ExpandComponent);
            const messageComponent = container.createComponent(factory);
            messageComponent.instance.childData = this.dataSource.data[index]; // Child data is @Input() in ExpandComponent..
            this.expandedRow = index;
        }
    }

    // Select For Status Change
    select(status: number) {
        let src = this.selection.selected;
        let target = this.dataSource.data;
        range(0, src.length)
            .pipe(
                delayWhen(num => of(num).pipe(delay(500 * num + 1))),
                map(counter => {
                    let id = src[counter];
                    if (id > 0) {
                        let trgIndex = target.findIndex(x => x.id === id);
                        if (trgIndex > -1) {
                            target[trgIndex].status = status;
                            this.dataSource._updateChangeSubscription();
                            return document.getElementById('state-' + id);
                        }
                    }
                })
            ).subscribe(el => $(el).animateCss('zoomIn'));
    }

    onDeleteRows() {
        this.confirmDelete = this.dialog.open(ConfirmDeleteComponent, {
            height: '150px',
            width: '30%'
        });
        this.confirmDelete.afterClosed().subscribe((result) => {
            if (result) {
                let data = this.dataSource.data;
                let selected = this.selection.selected;
                this.employeeService.select = selected;
                range(0, selected.length)
                    .pipe(
                        map(delIndex => data.findIndex(x => x.id === selected[delIndex])),
                        filter(index => index > -1)
                    )
                    .subscribe(index => {
                        data.splice(index, 1);
                        this.selection.clear();
                        this.dataSource._updateChangeSubscription();
                    });
                this.employeeService.deleteRows(); // Delete data form Repository
            }
        });
    }

    // Selecting list on table
    isAllSelected() {
        return this.selection.selected.length === this.dataSource.data.length;
    }

    // On DisplayColumns checkBox
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row.id));
    }

    ngAfterViewInit() {
        let obs = [this.sort.sortChange, this.paginator.page];
        merge(...obs)
            .pipe(
                flatMap(obj => this.employeeService.getSorted(<Sort>obj, this.start, this.end))
            ).subscribe(d => this.dataSource.data = d);
    }

    get start() {
        return this.paginator.pageIndex * this.paginator.pageSize;
    }
    get end() {
        return (this.paginator.pageIndex + 1) * this.paginator.pageSize;
    }

    ngOnInit() {
        this.employeeService.employeeinfo()
            .subscribe(d => {this.dataSource.data = d;
                this.dataSource._updateChangeSubscription();
            });
    }

    addOrUpdate(id: number) {
        let data = this.dataSource.data;
        let user = id > 0 ? data.find(x => x.id === id) : null; // If id > 0 appear form with value otherwise appear empty form 
        this.dialogRef = this.dialog.open(EmployeeInfoEditComponent, {
            width: '60%',
            height: '600px',
            data: user ? user : null
        });
        this.dialogRef.afterClosed()
            .subscribe(() => {
                let newdata = this.dialogRef.componentInstance.sendData;
                if (!newdata) return;
                this.employeeService.onEditTable(newdata) // Edit data in Repository
                    .pipe(filter(success => success),
                ).subscribe(el => {
                    let index = data.findIndex(x => x.id === id); // findIndex using id
                    if (index > -1) {
                        data[index] = newdata; // change data if index > -1
                    } else {
                        this.employeeService.register(newdata); // Add newdata on Repository
                        data.push(newdata); // Add newdata on view
                    }
                    this.dataSource._updateChangeSubscription();
                });
            });
    }
}