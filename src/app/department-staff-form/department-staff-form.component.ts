import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {first} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Department, DepartmentService} from "../service/department.service";
import {Employee, EmployeeService} from "../service/employee.service";
import {GlobalService} from "../service/global.service";

@Component({
    selector: 'app-department-staff-form',
    templateUrl: './department-staff-form.component.html',
    styleUrls: ['./department-staff-form.component.css']
})
export class DepartmentStaffFormComponent implements OnInit {
    head = ""
    department!: Department
    employees: Employee[] = []
    departmentEmployees: Employee[] = []
    employeeAddForm: FormGroup
    employee = new FormControl("", Validators.required)

    constructor(private formBuilder: FormBuilder,
                private departmentService: DepartmentService,
                private employeeService: EmployeeService,
                private globalService: GlobalService,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.employeeAddForm = this.formBuilder.group({
            employee: this.employee
        })
    }

    ngOnInit(): void {
        this.departmentService.getById(Number(this.data.locationId.id)).pipe(first()).subscribe(value => {
            this.department = value
            if (this.department.title) {
                this.head = this.department.title
            }
        })
        this.getByDepartmentEmployees()
        this.getFreeEmployees()
    }

    getFreeEmployees() {
        this.employeeService.getFree().pipe(first()).subscribe(value => {
            this.employees = value
        })
    }

    getByDepartmentEmployees() {
        this.employeeService.getByDepartment([], Number(this.data.locationId.id)).pipe(first()).subscribe(value => {
            this.departmentEmployees = value
        })
    }

    addEmployee() {
        this.employeeService.addToDepartment(this.employee.value, Number(this.data.locationId.id)).pipe(first()).subscribe({
            next: _ => {
                this.globalService.msg("ОК")
                this.employee.setValue("")
                this.getByDepartmentEmployees()
                this.getFreeEmployees()
            },
            error: error => {
                this.globalService.msg(error.error.message)
            }
        })
    }

    removeEmployee(id: number) {
        this.employeeService.removeFromDepartment(Number(this.data.locationId.id), id).subscribe({
            next: _ => {
                this.globalService.msg("ОК")
                this.getByDepartmentEmployees()
                this.getFreeEmployees()
            },
            error: error => {
                this.globalService.msg(error.error.message)
            }
        })
    }

    inputErrorMessage(input: FormControl) {
        return this.globalService.inputValidator(input)
    }

    close() {
        this.globalService.close()
    }
}
