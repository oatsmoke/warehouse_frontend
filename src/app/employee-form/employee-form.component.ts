import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {EmployeeService} from "../service/employee.service";
import {GlobalService} from "../service/global.service";

@Component({
    selector: 'app-employee-form',
    templateUrl: './employee-form.component.html',
    styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
    changed = true
    head = "Добавить сотрудника"
    employeeForm: FormGroup
    surname = new FormControl("", [
        Validators.required,
        Validators.pattern("[а-яА-Я]+"),
        Validators.maxLength(20)
    ])
    name = new FormControl("", [
        Validators.required,
        Validators.pattern("[а-яА-Я]+"),
        Validators.maxLength(20)
    ])
    patronymic = new FormControl("", [
        Validators.required,
        Validators.pattern("[а-яА-Я]+"),
        Validators.maxLength(20)
    ])
    phone = new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.maxLength(11)
    ])
    email = new FormControl("", [
        Validators.required,
        Validators.maxLength(30),
        Validators.email
    ])

    constructor(private formBuilder: FormBuilder,
                private employeeService: EmployeeService,
                private globalService: GlobalService,
                private dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) private data: any) {
        this.employeeForm = this.formBuilder.group({
            id: 0,
            surname: this.surname,
            name: this.name,
            patronymic: this.patronymic,
            phone: this.phone,
            email: this.email
        })
    }

    ngOnInit(): void {
        if (this.data != null) {
            this.changed = false
            this.head = "Изменить сотрудника"
            this.employeeForm.setValue({
                id: this.data.id,
                surname: this.data.surname,
                name: this.data.name,
                patronymic: this.data.patronymic,
                phone: this.data.phone,
                email: this.data.email
            })
        }
    }

    ok() {
        if (this.data == null) {
            this.create()
        } else {
            this.update()
        }
    }

    create() {
        const value = this.employeeForm.value
        const name = value.surname + " " + value.name + " " + value.patronymic
        this.employeeService.create(name, value.phone, value.email).pipe(first()).subscribe({
            next: _ => {
                this.globalService.msg("ОК")
                this.close()
            },
            error: error => {
                this.globalService.msg(error.error.message)
            }
        })
    }

    update() {
        const value = this.employeeForm.value
        const name = value.surname + " " + value.name + " " + value.patronymic
        this.employeeService.update(value.id, name, value.phone, value.email).pipe(first()).subscribe({
            next: _ => {
                this.globalService.msg("ОК")
                this.close()
            },
            error: error => {
                this.globalService.msg(error.error.message)
            }
        })
    }

    check() {
        if (this.data != null) {
            this.changed = !(this.employeeForm.value.surname == this.data.surname &&
                this.employeeForm.value.name == this.data.name &&
                this.employeeForm.value.patronymic == this.data.patronymic &&
                this.employeeForm.value.phone == this.data.phone &&
                this.employeeForm.value.email == this.data.email)
        }
    }

    inputErrorMessage(input: FormControl) {
        return this.globalService.inputValidator(input)
    }

    close() {
        this.globalService.close()
    }
}
