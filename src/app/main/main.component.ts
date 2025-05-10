import {Component, OnInit} from '@angular/core';
import {first} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {Employee, EmployeeService} from "../service/employee.service";
import {Department, DepartmentService} from "../service/department.service";
import {GlobalService} from "../service/global.service";

@Component({
  selector: 'app-main', templateUrl: './main.component.html', styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  employee: Employee = this.globalService.employee
  departments: Department[] = []
  employees: Employee[] = []

  constructor(private departmentService: DepartmentService,
              private employeeService: EmployeeService,
              private globalService: GlobalService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  getDepartments() {
    this.departmentService.getAll(false).pipe(first()).subscribe({
      next: (value: Department[]) => {
        this.departments = value
      },
      error: error => {
        this.globalService.msg(error.error.message)
      }
    })
  }

  getEmployees() {
    this.employeeService.getAll(false).pipe(first()).subscribe((value: any) => {
      this.employees = value
    })
  }

  dialogCreateContract() {
    this.dialog.open(DialogContractCreateForm)
  }

  dialogInputContract() {
    this.dialog.open(DialogContractInputForm)
  }

  dialogEquipmentSearch() {
    this.dialog.open(DialogEquipmentSearchForm)
  }

  haveAccessAdmin() {
    return this.globalService.employee.role == "ADMIN"
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

@Component({
  selector: 'dialog-equipment-search-form', templateUrl: './dialog-equipment-search-form.html'
})
export class DialogEquipmentSearchForm {
}
