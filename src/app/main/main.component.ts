import {Component, OnInit} from '@angular/core';
import {first} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Employee, EmployeeService} from "../service/employee.service";
import {Department, DepartmentService} from "../service/department.service";
import {GlobalService} from "../service/global.service";

@Component({
    selector: 'app-main', templateUrl: './main.component.html', styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
    employee!: Employee
    departments: Department[] = []
    employees: Employee[] = []
    number = new FormControl("")

    constructor(private activatedRoute: ActivatedRoute,
                private departmentService: DepartmentService,
                private employeeService: EmployeeService,
                private globalService: GlobalService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.pipe(first()).subscribe({
            next: (value: any) => {
                this.employee = value.getUserResolver
            },
            error: error => {
                this.globalService.msg(error.error.message)
            }
        })
    }

    getDepartments() {
        this.departmentService.getAll().pipe(first()).subscribe({
            next: value => {
                this.departments = value
            },
            error: error => {
                this.globalService.msg(error.error.message)
            }
        })
    }

    getEmployees() {
        this.employeeService.getAll().pipe(first()).subscribe((value: any) => {
            this.employees = value
        })
    }

    dialogCreateContract() {
        this.dialog.open(DialogContractCreateForm)
    }

    dialogInputContract() {
        this.dialog.open(DialogContractInputForm)
    }
}

@Component({
    selector: 'dialog-contract-create-form', templateUrl: './dialog-contract-create-form.html'
})
export class DialogContractCreateForm {
}

@Component({
    selector: 'dialog-contract-input-form', templateUrl: './dialog-contract-input-form.html'
})
export class DialogContractInputForm {
}